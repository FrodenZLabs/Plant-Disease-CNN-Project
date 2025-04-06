import express from "express";
import {
  deleteUser,
  getUserById,
  signin,
  signout,
  signup,
  updateUser,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";
import { uploadProfile } from "../utils/uploadImage.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/get_profile", verifyToken, getUserById);
router.put(
  "/update_user",
  verifyToken,
  upload.single("user_profile"),
  uploadProfile,
  updateUser
);
router.delete("/delete_user", verifyToken, deleteUser);

export default router;
