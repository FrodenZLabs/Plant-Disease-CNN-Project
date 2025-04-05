const ServicePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-green-700 text-center">
        Our Services
      </h1>
      <p className="text-gray-700 text-lg text-center mt-4">
        Empowering farmers and plant enthusiasts with AI-driven plant disease
        detection and insights.
      </p>

      {/* Service Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* AI Disease Detection */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            🌿 AI Disease Detection
          </h2>
          <p className="text-gray-700 mt-2">
            Instantly analyze plant leaf images and identify diseases with our
            advanced AI model.
          </p>
        </div>

        {/* Detailed Diagnosis & Reports */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            📊 Detailed Diagnosis & Reports
          </h2>
          <p className="text-gray-700 mt-2">
            Receive comprehensive insights on plant diseases, symptoms, and
            suggested treatments.
          </p>
        </div>

        {/* Treatment & Prevention Tips */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            💡 Treatment & Prevention Tips
          </h2>
          <p className="text-gray-700 mt-2">
            Get expert-recommended solutions and preventive measures to keep
            your plants healthy.
          </p>
        </div>

        {/* Multi-Plant Support */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            🌾 Multi-Plant Support
          </h2>
          <p className="text-gray-700 mt-2">
            Our AI supports a wide range of crops, from fruits and vegetables to
            flowers and cereals.
          </p>
        </div>

        {/* User-Friendly Interface */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            🖥️ User-Friendly Interface
          </h2>
          <p className="text-gray-700 mt-2">
            Easily upload images, get results, and navigate our intuitive
            platform hassle-free.
          </p>
        </div>

        {/* 24/7 Access */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            ⏳ 24/7 Access
          </h2>
          <p className="text-gray-700 mt-2">
            Our AI-powered system is available anytime, anywhere for instant
            plant health analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
