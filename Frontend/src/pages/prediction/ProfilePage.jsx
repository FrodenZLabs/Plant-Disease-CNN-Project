import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Spinner, Button, Modal, TextInput, Avatar } from "flowbite-react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaChartLine,
  FaLeaf,
  FaHistory,
} from "react-icons/fa";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: null,
  });
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [userResponse, statsResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/users/me", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8000/api/predictions/stats", {
            withCredentials: true,
          }),
        ]);

        setUserData(userResponse.data.user);
        setFormData({
          username: userResponse.data.user.username,
          email: userResponse.data.user.email,
        });
        setStats(statsResponse.data);
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const response = await axios.put(
        "http://localhost:8000/api/users/update",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData(response.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await axios.delete("http://localhost:8000/api/users/delete", {
        withCredentials: true,
      });
      toast.success("Account deleted successfully");
      // Redirect to home or handle logout
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete account");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your profile.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/sign-in"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner size="xl" color="success" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="relative">
                  <Avatar
                    alt="User profile"
                    img={previewAvatar || userData?.avatar || ""}
                    rounded
                    size="xl"
                    className="border-4 border-white"
                  />
                  {editMode && (
                    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                      <FaEdit className="text-green-600" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">
                    {editMode ? (
                      <TextInput
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    ) : (
                      userData?.username
                    )}
                  </h1>
                  <p className="text-green-100">
                    {editMode ? (
                      <TextInput
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                        className="bg-gray-100"
                      />
                    ) : (
                      userData?.email
                    )}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {editMode ? (
                  <>
                    <Button color="success" onClick={handleSubmit}>
                      <FaSave className="mr-2" />
                      Save Changes
                    </Button>
                    <Button color="light" onClick={() => setEditMode(false)}>
                      <FaTimes className="mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button color="light" onClick={() => setEditMode(true)}>
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaChartLine className="mr-2 text-green-600" />
              Your Plant Analysis Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full mr-3">
                    <FaLeaf className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Predictions</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stats?.totalPredictions || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full mr-3">
                    <FaHistory className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Last Prediction</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {stats?.lastPredictionDate
                        ? new Date(
                            stats.lastPredictionDate
                          ).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full mr-3">
                    <FaUser className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-gray-500">Member Since</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(userData?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Change Password</h3>
                  <p className="text-sm text-gray-500">
                    Update your account password
                  </p>
                </div>
                <Button
                  color="light"
                  onClick={() =>
                    toast.info("Password change functionality coming soon")
                  }
                >
                  Change Password
                </Button>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">Delete Account</h3>
                  <p className="text-sm text-gray-500">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button
                  color="failure"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Account Deletion</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-red-500 font-medium">
              Warning: This action cannot be undone!
            </p>
            <p>
              All your data including predictions will be permanently deleted.
              Are you sure you want to proceed?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete My Account"}
          </Button>
          <Button color="light" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
