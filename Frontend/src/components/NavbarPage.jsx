import { Navbar } from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";

const NavbarPage = () => {
  return (
    <div className="bg-green-300 px-6 py-3">
      <Navbar fluid rounded className="bg-green-300 max-w-5xl mx-auto">
        <Navbar.Brand href="/">
          <img
            src={LeafGuardLogo}
            className="mr-3 h-6 sm:h-9"
            alt="LeafGuard AI Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
            LeafGuard AI
          </span>
        </Navbar.Brand>

        <div className="flex space-x-6">
          <a
            href="/"
            className="text-gray-700 font-normal text-lg hover:text-yellow-400 hover:font-semibold transition"
          >
            Home
          </a>
          <a
            href="/about-us"
            className="text-gray-700 font-normal text-lg hover:text-yellow-400 hover:font-semibold transition"
          >
            About
          </a>
          <a
            href="/services"
            className="text-gray-700 font-normal text-lg hover:text-yellow-400 hover:font-semibold transition"
          >
            Services
          </a>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarPage;
