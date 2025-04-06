import Auth from "../models/auth.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import Prediction from "../models/prediction.models.js";

export const signup = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      next(errorHandler(400, "All fields are required."));
    }

    // Check if username or email already exists
    const existingUser = await Auth.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(
        errorHandler(
          400,
          existingUser.email === email
            ? "Email is already in use."
            : "Username is already taken."
        )
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Auth({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    response.status(201).json({
      success: true,
      message: "Sign Up Successful",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Something went wrong. Please try again."));
  }
};

export const signin = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    next(errorHandler(404, "All fields are required."));
  }

  try {
    const validUser = await Auth.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(
        errorHandler(400, "Invalid password. The password is incorrect.")
      );
    }
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: pass, ...rest } = validUser._doc;

    response
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({
        success: true,
        message: "User has signed in successfully.",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

export const signout = (request, response, next) => {
  try {
    response.clearCookie("access_token").status(200).json({
      success: true,
      message: "User has been signed out successfully.",
    });
  } catch (error) {
    next(errorHandler(500, "Error signing out."));
  }
};

export const getUserById = async (request, response, next) => {
  const authId = request.user.id;
  try {
    const user = await Auth.findById(authId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;

    response.status(200).json({ success: true, rest });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch user", error));
  }
};

export const updateUser = async (request, response, next) => {
  const { username, email, password } = request.body;
  const authId = request.user.id;

  // Ensure the user can only update their own account
  if (request.user.id !== authId) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // Prepare the update object
    const updateFields = {};

    if (username) {
      updateFields.username = username;
    }
    if (email) {
      updateFields.email = email;
    }
    if (password) {
      // Hash the password and add it to the updateFields object
      updateFields.password = bcryptjs.hashSync(password, 10);
    }
    // Handle profile image upload if present
    if (request.imageUrl) {
      // First get current user to check for existing profile image
      const currentUser = await Auth.findById(authId);

      // Delete old image from Cloudinary if it's not the default
      if (
        currentUser.user_profile &&
        !currentUser.user_profile.includes("imgs.search.brave.com")
      ) {
        const publicId = currentUser.user_profile
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      updateFields.user_profile = request.imageUrl;
    }

    // Update the user
    const updatedUser = await Auth.findByIdAndUpdate(authId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(errorHandler(404, "Auth not found"));
    }

    // Exclude sensitive fields from the response
    const { password: hashedPassword, ...rest } = updatedUser._doc;

    response.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: rest,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error occurred while updating user."));
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    const authId = request.user.id;

    // Allow admins or the user themselves to delete
    if (!request.user.role === "admin" && request.user.id !== authId) {
      return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    // Delete all associated clients and guarantors
    await Prediction.deleteMany({ authId });

    // Delete the user
    await Auth.findByIdAndDelete(authId);

    response.status(200).json({
      success: true,
      message: "User and associated records deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to delete user"));
  }
};
