import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import Prediction from "../models/prediction.models.js";
import { errorHandler } from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";
import FormData from "form-data";
import plantDiseaseData from "../utils/data.js";
dotenv.config();

const FLASK_API_URL = process.env.FLASK_API_URL;

export const uploadAndPredict = async (request, response, next) => {
  try {
    const authId = request.user.id;
    const cloudinaryResult = request.cloudinaryResult;
    const imageFile = request.file;

    // Create proper FormData
    const formData = new FormData();
    formData.append("file", fs.readFileSync(imageFile.path), {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype,
    });

    // Send to Flask API for prediction
    const flaskResponse = await axios.post(
      `${FLASK_API_URL}/predict`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Changed from image/jpeg
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const predictionResult = flaskResponse.data;

    // Transform Flask response to match your schema
    const [plant, disease] = predictionResult.prediction.split("___");
    const diseaseKey = `${plant}___${disease}`;
    const diseaseInfo = plantDiseaseData[diseaseKey] || {
      title: disease,
      description: "No additional information available for this condition",
      causes: [],
      prevention: [],
      treatment: [],
    };

    const prediction = new Prediction({
      authId,
      imageUrl: cloudinaryResult.secure_url, // Use Cloudinary URL,
      originalFileName: imageFile.originalname,
      prediction: {
        plant,
        disease,
        confidence: predictionResult.confidence,
        isHealthy: disease.toLowerCase().includes("healthy"),
        diseaseInfo: {
          title: diseaseInfo.title,
          description: diseaseInfo.description,
          causes: diseaseInfo.causes,
          prevention: diseaseInfo.prevention,
          treatment: diseaseInfo.treatment,
        },
      },
    });

    await prediction.save();

    // Clean up temporary file
    fs.unlinkSync(imageFile.path);

    response.json({
      success: true,
      message: "successfully uploaded and predicted the plant disease.",
      prediction,
    });
  } catch (error) {
    console.error("Prediction error:", error);

    // Clean up the temp file if something went wrong
    if (request.file && fs.existsSync(request.file.path)) {
      fs.unlinkSync(request.file.path);
    }

    // Clean up Cloudinary upload if it succeeded but prediction failed
    if (request.cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(request.cloudinaryResult.public_id);
    }
    next(errorHandler(500, "Failed to process image"));
  }
};

// getUserPredictions remains the same as before
export const getUserPredictions = async (request, response, next) => {
  try {
    const authId = request.user.id;
    const predictions = await Prediction.find({ authId })
      .sort({ createdAt: -1 })
      .lean();

    // Calculate total predictions count for this user
    const totalPredictions = await Prediction.countDocuments({
      authId: authId,
    });

    // Get the date of the most recent prediction (if any exist)
    const lastPredictionDate =
      predictions.length > 0 ? predictions[0].createdAt : null;

    response.status(200).json({
      success: true,
      predictions,
      totalPredictions,
      lastPredictionDate,
    });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    next(errorHandler(500, "Failed to fetch predictions"));
  }
};

// Get single prediction by ID
export const getPredictionById = async (request, response, next) => {
  try {
    const predictionId = request.params.predictionId;
    const authId = request.user.id; // Get authenticated user ID

    // Find prediction that belongs to the authenticated user
    const prediction = await Prediction.findOne({
      _id: predictionId,
      authId: authId,
    });

    if (!prediction) {
      return next(
        errorHandler(404, "Prediction not found or unauthorized access")
      );
    }

    response.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error("Error fetching prediction:", error);
    next(errorHandler(500, "Failed to fetch prediction"));
  }
};

// Delete a prediction
export const deletePrediction = async (request, response, next) => {
  try {
    const predictionId = request.params.predictionId;
    const authId = request.user.id;

    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return next(errorHandler(404, "Prediction not found"));
    }

    // Check if user is admin OR the owner of the prediction
    if (
      request.user.role !== "admin" &&
      prediction.authId.toString() !== authId
    ) {
      return next(
        errorHandler(403, "You are not authorized to delete this prediction")
      );
    }

    // Delete each image from Cloudinary and local storage
    if (prediction.images && prediction.images.length > 0) {
      for (const imageUrl of prediction.images) {
        try {
          // Extract public ID from Cloudinary URL
          const publicId = imageUrl.split("/").pop().split(".")[0];

          // Delete from Cloudinary
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error(`Error deleting from Cloudinary: ${error.message}`);
        }
      }
    }

    await Prediction.findByIdAndDelete(predictionId);
    response.status(200).json({
      success: true,
      message: "Prediction deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Failed to delete prediction", error));
  }
};
