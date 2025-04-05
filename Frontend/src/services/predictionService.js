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
