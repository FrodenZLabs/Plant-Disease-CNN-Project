import cloudinary from "./cloudinary.js";

export const uploadSingle = async (request, response, next) => {
  try {
    const image = request.file; // Extract the uploaded file

    if (!image) {
      return response
        .status(400)
        .json({ success: false, message: "No image provided" });
    }
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "plant_predictions",
      resource_type: "auto",
    });

    // Attach the image URL to the request object
    request.cloudinaryResult = result;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadProfile = async (request, response, next) => {
  try {
    const image = request.file; // Extract the uploaded file

    if (!image) {
      return response
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "user_profiles",
    });

    // Attach the secure URL to the request object
    request.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    next(error);
  }
};
