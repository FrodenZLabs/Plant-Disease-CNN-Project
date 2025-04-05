import { FaLeaf, FaCamera, FaBrain } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Accurate Detection",
      desc: "Uses AI to detect plant diseases with high accuracy.",
    },
    {
      icon: <FaCamera />,
      title: "Easy to Use",
      desc: "Just upload a leaf image, and get instant results.",
    },
    {
      icon: <FaBrain />,
      title: "AI-Powered",
      desc: "Built with deep learning for smart predictions.",
    },
  ];

  return (
    <div className="py-16 text-center bg-white max-w-4xl mx-auto">
      <h2 className="text-3xl uppercase font-bold text-green-700">
        Why Choose Our App?
      </h2>
      <div className="flex justify-center gap-8 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-1/3 p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="text-4xl text-green-600">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-2">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
