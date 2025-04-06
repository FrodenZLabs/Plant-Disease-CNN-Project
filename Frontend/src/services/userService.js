import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signin`,
      { email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/signout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage || "Error logging out.";
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/get_profile`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage || "Error logging out.";
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/auth/update_user`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage;
  }
};

export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/api/auth/delete_user`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.errorMessage || "Error logging out.";
  }
};
