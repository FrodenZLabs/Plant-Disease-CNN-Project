import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getPredictionById,
  getUserPredictions,
  uploadAndPredict,
} from "../controllers/prediction.controllers.js";
import { uploadSingle } from "../utils/uploadImage.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post(
  "/upload-predict",
  verifyToken,
  upload.single("image"),
  uploadSingle,
  uploadAndPredict
);
router.get("/get_predictions", verifyToken, getUserPredictions);
router.get("/get_predictions/:predictionId", verifyToken, getPredictionById);

export default router;
