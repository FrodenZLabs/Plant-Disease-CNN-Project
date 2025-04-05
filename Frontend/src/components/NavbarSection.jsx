import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/userService";
import { toast } from "react-toastify";
import { signoutSuccess } from "../redux/reducers/authSlice";

const NavbarSection = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to log out");
    }
  };

  return (
    <div className="bg-[#08ab6f] px-6 py-3">
      <Navbar fluid rounded className="bg-[#08ab6f] max-w-5xl mx-auto">
        <NavbarBrand href="/">
          <img
            src={LeafGuardLogo}
            className="mr-3 h-6 sm:h-9"
            alt="LeafGuard AI Logo"
          />
          <span className="self-center whitespace-nowrap text-3xl font-semibold text-black">
            LeafGuard AI
          </span>
        </NavbarBrand>

        <div className="flex md:order-2 items-center gap-4">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    currentUser.avatar ||
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm font-semibold">
                  {currentUser.username || currentUser.email}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser.email}
                </span>
              </DropdownHeader>
              <DropdownItem as={Link} to="/profile">
                Profile
              </DropdownItem>
              <DropdownItem as={Link} to="/my-predictions">
                My Predictions
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem as={Link} onClick={handleSignout}>
                Sign out
              </DropdownItem>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-[#08ab6f] bg-white rounded-lg hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-[#067a51] rounded-lg hover:bg-[#056342] transition"
              >
                Sign Up
              </Link>
            </div>
          )}
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          <NavbarLink
            href="/"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Home
          </NavbarLink>
          <NavbarLink
            href="/about-us"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            About
          </NavbarLink>
          <NavbarLink
            href="/services"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Services
          </NavbarLink>
          {currentUser && (
            <NavbarLink
              href="/upload-image"
              className="text-white font-semibold text-lg hover:text-yellow-300 transition"
            >
              Predict Disease
            </NavbarLink>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default NavbarSection;
