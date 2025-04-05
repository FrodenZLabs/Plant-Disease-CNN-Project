import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { predictImage } from "../../services/predictionService";

const PredictionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Validate file size (e.g., 10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview
      setResult(null); // Reset previous result
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await predictImage(formData);
      setResult(response.prediction.prediction);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error(error.message || "Failed to analyze image");
      setResult({ error: "Failed to analyze image. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 py-[10vh] px-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          🌱 Upload a Plant Leaf Image
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          AI will analyze the image and detect diseases.
        </p>

        {/* Upload Box */}
        <label className="border-2 border-dashed border-green-500 bg-white w-full h-80 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-md hover:border-green-700 transition mb-6">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-600">
              <FaCloudUploadAlt size={40} />
              <p className="mt-2">Click to upload plant image</p>
              <p className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG (Max 10MB)
              </p>
            </div>
          )}
        </label>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ${
            !image ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!image || loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <CircleLoader color="#ffffff" size={20} className="mr-2" />
              Analyzing...
            </span>
          ) : (
            "🔍 Analyze Image"
          )}
        </button>

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-4 bg-white border border-green-200 rounded-lg">
            {result.error ? (
              <p className="text-red-500 text-center">{result.error}</p>
            ) : (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-green-700 mb-2">
                    {result.plant} - {result.disease}
                  </h2>
                  <p className="text-gray-700">
                    Confidence: {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                {result.diseaseInfo && (
                  <div className="bg-green-50 p-4 rounded-lg grid grid-cols-2 items-center">
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">
                        About this disease:
                      </h3>
                      <p className="text-gray-700 mb-3">
                        {result.diseaseInfo.description}
                      </p>

                      <h3 className="font-semibold text-green-700 mb-1">
                        Causes:
                      </h3>
                      <ul className="list-disc pl-5 mb-3 text-gray-700">
                        {result.diseaseInfo.causes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-700 mb-1">
                        Prevention:
                      </h3>
                      <ul className="list-disc pl-5 mb-3 text-gray-700">
                        {result.diseaseInfo.prevention.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <h3 className="font-semibold text-green-700 mb-1">
                        Treatment:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700">
                        {result.diseaseInfo.treatment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
