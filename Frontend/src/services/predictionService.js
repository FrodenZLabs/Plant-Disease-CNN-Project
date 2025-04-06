import axios from "axios";

const API_URL = "http://localhost:8000";

export const predictImage = async (imageData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/predict/upload-predict`,
      imageData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.errorMessage ||
      "An error occurred while analyzing the image."
    );
  }
};

export const fetchUserPrediction = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/predict/get_predictions`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const fetchUserPredictionByID = async (predictionId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/predict/get_predictions/${predictionId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const deletePrediction = async (predictionId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/delete_predictions/${predictionId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};
