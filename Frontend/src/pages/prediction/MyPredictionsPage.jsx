import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  deletePrediction,
  fetchUserPrediction,
} from "../../services/predictionService";
import { SyncLoader } from "react-spinners";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const MyPredictionsPage = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [predictionToDelete, setPredictionToDelete] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        const response = await fetchUserPrediction();
        setPredictions(response.predictions);
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch predictions"
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPredictions();
    }
  }, [currentUser]);

  const handleDeletePrediction = async () => {
    if (!predictionToDelete) return;

    try {
      setLoading(true);
      await deletePrediction(predictionToDelete);
      setPredictions(
        predictions.filter((pred) => pred._id !== predictionToDelete)
      );
      toast.success("Prediction deleted successfully");
    } catch (error) {
      toast.error(error || "Failed to delete prediction");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setPredictionToDelete(null);
    }
  };

  const openDeleteModal = (predictionId) => {
    setPredictionToDelete(predictionId);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <SyncLoader color="#ffcb00" size={40} />
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            My Plant Predictions
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search predictions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {predictions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No predictions found
            </h2>
            <p className="text-gray-500 mb-6">
              You haven't made any predictions yet. Try analyzing a plant image!
            </p>
            <Link
              to="/upload-image"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Analyze a Plant
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <div
                key={prediction._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={prediction.imageUrl}
                    alt={prediction.originalFileName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2">
                    <button
                      onClick={() => openDeleteModal(prediction._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {prediction.prediction.plant}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        prediction.prediction.isHealthy
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {prediction.prediction.isHealthy ? "Healthy" : "Diseased"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {prediction.prediction.disease}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(prediction.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold">
                      Confidence:{" "}
                      {(prediction.prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <Link
                  to={`/my-predictions/${prediction._id}`}
                  className="block w-full py-2 bg-green-50 text-green-600 text-center font-medium hover:bg-green-100 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Prediction Modal */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalHeader>Confirm Prediction Deletion</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-red-500 font-medium">
              Warning: This action cannot be undone!
            </p>
            <p>
              This prediction will be permanently deleted. Are you sure you want
              to proceed?
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            onClick={handleDeletePrediction}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete Prediction"}
          </Button>
          <Button
            color="light"
            onClick={() => {
              setShowDeleteModal(false);
              setPredictionToDelete(null);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyPredictionsPage;
