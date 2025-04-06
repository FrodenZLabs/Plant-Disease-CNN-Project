import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import {
  deletePrediction,
  fetchUserPredictionByID,
} from "../../services/predictionService";
import { SyncLoader } from "react-spinners";

const PredictionDetailsPage = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.authentication);
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        const response = await fetchUserPredictionByID(id);
        setPrediction(response.prediction);
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch prediction details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchPrediction();
    }
  }, [id, currentUser]);

  const handleDeletePrediction = async () => {
    try {
      setDeleting(true);
      await deletePrediction(id);
      toast.success("Prediction deleted successfully");
      navigate("/my-predictions");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete prediction");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <SyncLoader color="#ffcb00" size={50} />
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/my-predictions"
            className="inline-flex items-center text-green-600 hover:text-green-800 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to My Predictions
          </Link>
        </div>

        {prediction.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Prediction Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The prediction you're looking for doesn't exist or you don't
                have permission to view it.
              </p>
              <Link
                to="/my-predictions"
                className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Back to My Predictions
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Section */}
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src={prediction.imageUrl}
                alt={prediction.originalFileName}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Prediction Details */}
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {prediction.prediction.plant}
                  </h1>
                  <div className="flex items-center mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        prediction.prediction.isHealthy
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {prediction.prediction.isHealthy ? "Healthy" : "Diseased"}
                    </span>
                    <span className="ml-4 text-gray-600">
                      {new Date(prediction.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-800">
                    Confidence:{" "}
                    {(prediction.prediction.confidence * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Disease Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {prediction.prediction.disease}
                </h2>
                {prediction.prediction.diseaseInfo && (
                  <>
                    <p className="text-gray-700 mb-4">
                      {prediction.prediction.diseaseInfo.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-red-700 mb-2">
                          Causes
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {prediction.prediction.diseaseInfo.causes.map(
                            (item, index) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-700 mb-2">
                          Prevention Measures
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {prediction.prediction.diseaseInfo.prevention.map(
                            (item, index) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-700 mb-2">
                          Treatment Options
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {prediction.prediction.diseaseInfo.treatment.map(
                            (item, index) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 border-t pt-4">
                <Button
                  color="red"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash className="mr-2" />
                      Delete Prediction
                    </>
                  )}
                </Button>
                <Link to="/upload-image">
                  <Button color="green">Analyze Another Plant</Button>
                </Link>
              </div>
            </div>
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
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, Delete Prediction"}
          </Button>
          <Button color="light" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PredictionDetailsPage;
