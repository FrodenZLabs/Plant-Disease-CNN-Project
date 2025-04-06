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
import { getProfile, logoutUser } from "../services/userService";
import { toast } from "react-toastify";
import { signoutSuccess } from "../redux/reducers/authSlice";
import { useEffect, useState } from "react";

const NavbarSection = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await getProfile();

        setUsername(userResponse.rest.username || "");
        setEmail(userResponse.rest.email || "");
        setAvatar(userResponse.rest.user_profile || "");
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

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
              label={<Avatar alt="User settings" img={avatar} rounded />}
              className="w-56"
            >
              <DropdownHeader>
                <span className="block text-sm">
                  Username: <span className="underline italic">{username}</span>
                </span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownItem as={Link} to="/get_profile">
                Profile
              </DropdownItem>
              <DropdownItem as={Link} to="/my-predictions">
                My Predictions
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                as={Link}
                onClick={handleSignout}
                className="hover:bg-red-300 focus:bg-red-300"
              >
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
