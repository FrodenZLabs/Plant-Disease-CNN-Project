import { Button, Navbar } from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";

const NavbarPage = () => {
  return (
    <Navbar fluid rounded className="bg-green-300 px-6">
      <Navbar.Brand href="/">
        <img
          src={LeafGuardLogo}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LeafGuard AI
        </span>
      </Navbar.Brand>

      <div className="flex">
        <Navbar.Link href="" className="text-white">
          Home
        </Navbar.Link>
        <Navbar.Link href="" className="text-white">
          About
        </Navbar.Link>
        <Navbar.Link href="" className="text-white">
          Services
        </Navbar.Link>
      </div>
    </Navbar>
  );
};

export default NavbarPage;
