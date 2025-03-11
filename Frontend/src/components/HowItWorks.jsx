import { IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";
import { FaBrain, FaRegLightbulb } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <IoCloudUploadOutline className="text-green-600 w-8 h-8" />,
      text: "Upload a clear image of the affected plant leaf.",
    },
    {
      icon: <IoImageOutline className="text-green-600 w-8 h-8" />,
      text: "The AI model preprocesses the image (resizing, normalization).",
    },
    {
      icon: <FaBrain className="text-green-600 w-8 h-8" />,
      text: "Our deep learning model analyzes leaf structures and patterns.",
    },
    {
      icon: <FaRegCheckCircle className="text-green-600 w-8 h-8" />,
      text: "The model predicts the possible disease and assigns a confidence score.",
    },
    {
      icon: <FaRegLightbulb className="text-green-600 w-8 h-8" />,
      text: "The system provides instant results with recommendations.",
    },
  ];

  return (
    <div className="py-16 bg-green-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl uppercase font-bold text-green-700 text-center">
          How It Works
        </h2>
        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {step.icon}
              <p className="text-lg text-gray-700">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
