const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Heading Section */}
      <h1 className="text-3xl font-bold text-green-700 text-center uppercase">
        About LeafGuard AI
      </h1>
      <p className="text-gray-700 text-lg text-center mt-4">
        Revolutionizing plant health monitoring with{" "}
        <span className="font-bold">AI-powered disease detection</span>. Get
        fast, accurate, and reliable diagnoses to protect your crops and
        maximize yield.
      </p>

      {/* Mission Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-green-600 text-center uppercase">
          🌱 Our Mission
        </h2>
        <p className="text-gray-700 mt-2">
          At <span className="font-semibold">LeafGuard AI</span>, we are
          dedicated to leveraging{" "}
          <span className="font-semibold">
            cutting-edge artificial intelligence
          </span>{" "}
          to help farmers, gardeners, and agricultural experts detect plant
          diseases early. Our goal is to reduce crop losses, improve food
          security, and promote sustainable farming.
        </p>
      </div>

      {/* Vision Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-green-600 text-center uppercase">
          🌍 Our Vision
        </h2>
        <p className="text-gray-700 mt-2">
          We envision a world where{" "}
          <span className="font-semibold">technology and agriculture</span> work
          together seamlessly. By harnessing AI, we strive to create a **future
          where plant diseases are detected early**, leading to{" "}
          <span className="font-semibold">
            healthier crops, increased productivity, and minimal environmental
            impact
          </span>
          .
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold text-green-600 text-center uppercase">
          📩 Get in Touch
        </h2>
        <p className="text-gray-700 mt-2">
          Have questions or suggestions? We'd love to hear from you! Reach out
          via email at{" "}
          <span className="font-semibold">support@leafguardai.com</span> or
          connect with us on social media.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
