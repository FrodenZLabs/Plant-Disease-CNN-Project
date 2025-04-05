import { Button } from "flowbite-react";
import HeroBG from "../assets/images.jpeg";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover flex flex-col items-center justify-center text-center"
      style={{ backgroundImage: `url(${HeroBG})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          🌿 AI-Powered Plant Health Check
        </h1>
        <p className="my-6 text-3xl text-gray-200 max-w-4xl mx-auto font-extralight">
          Upload a photo of your plant, and let our advanced AI detect diseases
          in seconds. Get real-time insights and expert recommendations to keep
          your plants thriving!
        </p>
      </div>
      <Button
        href="/upload-image"
        className="bg-green-500 text-whitetext-xl font-semibold hover:bg-green-700"
      >
        🌱 Scan Your Plant Now
      </Button>
    </div>
  );
};

export default HeroSection;
