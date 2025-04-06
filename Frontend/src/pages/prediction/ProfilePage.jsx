import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Spinner,
  Button,
  Modal,
  TextInput,
  Avatar,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaChartLine,
  FaLeaf,
  FaHistory,
} from "react-icons/fa";
import { deleteUser, getProfile, updateUser } from "../../services/userService";
import { fetchUserPrediction } from "../../services/predictionService";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await getProfile();
        const statsResponse = await fetchUserPrediction();

        setUserData(userResponse.rest);
        setUsername(userResponse.rest.username || "");
        setEmail(userResponse.rest.email || "");
        setAvatar(userResponse.rest.user_profile || "");
        setStats(statsResponse);
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

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create FormData object for file uploads
      const formDataToSend = new FormData();

      // Append only changed fields
      if (username && username !== userData.username) {
        formDataToSend.append("username", username);
      }
      if (email && email !== userData.email) {
        formDataToSend.append("email", email);
      }
      if (password) {
        formDataToSend.append("password", password);
      }
      if (avatar) {
        // This is the File object from file input
        formDataToSend.append("user_profile", avatar);
      }

      // Ensure at least one field is provided for the update
      if (formDataToSend.keys().length === 0) {
        toast.error("No fields provided for update.");
        setLoading(false);
        return;
      }

      const response = await updateUser(formDataToSend);

      setUserData(response.user);
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
      await deleteUser();
      toast.success("Account deleted successfully");
      navigate("/register");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete account");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <SyncLoader color="#ffcb00" size={40} />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="relative">
                  <Avatar
                    alt="User profile"
                    img={previewAvatar || avatar}
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
                        value={username}
                        onChange={handleUserChange}
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
                        value={email}
                        onChange={handleUserChange}
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
                <Button color="red" onClick={() => setShowDeleteModal(true)}>
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalHeader>Confirm Account Deletion</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-red-500 font-medium">
              Warning: This action cannot be undone!
            </p>
            <p>
              All your data including predictions will be permanently deleted.
              Are you sure you want to proceed?
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" onClick={handleDeleteAccount} disabled={loading}>
            {loading ? "Deleting..." : "Yes, Delete My Account"}
          </Button>
          <Button color="light" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProfilePage;
