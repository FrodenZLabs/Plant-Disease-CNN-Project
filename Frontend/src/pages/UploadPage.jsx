import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [diseaseDescription, setDiseaseDescription] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview
      setResult(null); // Reset previous result
    }
  };

  const getDiseaseDescription = (prediction) => {
    if (prediction === "Apple___Apple_scab") {
      return "Apple Scab is a fungal disease causing dark, scaly lesions on leaves and fruit, reducing fruit quality and yield.";
    } else if (prediction === "Apple___Black_rot") {
      return "Black Rot affects apples, leading to fruit rot and leaf spots. It is caused by a fungus that thrives in humid conditions.";
    } else if (prediction === "Apple___Cedar_apple_rust") {
      return "Cedar Apple Rust appears as orange spots on leaves and fruit, caused by a fungus that requires junipers as an alternate host.";
    } else if (prediction === "Apple___healthy") {
      return "This apple leaf appears healthy! Keep maintaining good agricultural practices.";
    } else if (prediction === "Blueberry___healthy") {
      return "This blueberry plant appears to be in great health!";
    } else if (prediction === "Cherry_(including_sour)___Powdery_mildew") {
      return "Powdery Mildew forms a white powdery coating on cherry leaves, reducing photosynthesis and fruit yield.";
    } else if (
      prediction === "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot"
    ) {
      return "Gray Leaf Spot in corn causes elongated grayish lesions on leaves, leading to yield loss if untreated.";
    } else if (prediction === "Corn_(maize)___Common_rust_") {
      return "Common Rust in corn presents as reddish-brown pustules on leaves, reducing photosynthesis and crop health.";
    } else if (prediction === "Corn_(maize)___healthy") {
      return "This corn plant is healthy with no visible disease symptoms!";
    } else if (prediction === "Grape___Black_rot") {
      return "Black Rot in grapes results in brown leaf spots and shriveled fruit, leading to poor vineyard yield.";
    } else if (prediction === "Grape___Esca_(Black_Measles)") {
      return "Black Measles causes dark streaks on leaves and fruit rot in grapes, often leading to vine decline.";
    } else if (prediction === "Orange___Haunglongbing_(Citrus_greening)") {
      return "Citrus Greening is a bacterial disease that causes yellowing leaves, misshapen fruit, and eventual tree death.";
    } else if (prediction === "Potato___Early_blight") {
      return "Early Blight in potatoes forms dark, concentric-ring lesions on leaves, reducing tuber quality.";
    } else if (prediction === "Potato___Late_blight") {
      return "Late Blight is a devastating fungal disease causing dark water-soaked lesions on potato leaves and tubers.";
    } else if (prediction === "Strawberry___Leaf_scorch") {
      return "Strawberry Leaf Scorch leads to brown, dried leaf edges, reducing fruit production and plant vigor.";
    } else if (prediction === "Tomato___Late_blight") {
      return "Tomato Late Blight is a serious fungal disease that causes dark, rapidly expanding lesions on leaves and fruit.";
    } else if (prediction === "Tomato___Tomato_Yellow_Leaf_Curl_Virus") {
      return "Yellow Leaf Curl Virus in tomatoes results in curled, yellowed leaves and stunted growth, spread by whiteflies.";
    } else {
      return "This plant's health status is currently unrecognized. Consider consulting an agricultural expert for further analysis.";
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setResult(data);
      setDiseaseDescription(getDiseaseDescription(data.prediction));
    } catch (error) {
      toast.error("Error uploading image.");
      console.error("Error uploading image:", error);
      setResult({ error: "Failed to analyze image. Try again!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-green-50 py-[10vh]">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🌱 Upload a Plant Leaf Image
      </h1>
      <p className="text-gray-700 mb-6">
        AI will analyze the image and detect diseases.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <CircleLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* Upload Box */}
      <label className="border-2 border-dashed border-green-500 bg-white w-96 h-64 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-md hover:border-green-700 transition">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {preview ? (
          <img
            src={preview}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-600">
            <FaCloudUploadAlt size={40} />
            <p className="mt-2">Click to upload</p>
          </div>
        )}
      </label>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "🔍 Analyze Image"}
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-6 p-4 w-80 text-center bg-white shadow-lg rounded-lg">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-green-700">
                Prediction: {result.prediction}
              </p>
              <p className="text-gray-700">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>
              <p className="text-gray-600 mt-2">{diseaseDescription}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
