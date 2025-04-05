import mongoose from "mongoose";

const DiseaseInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  causes: {
    type: [String],
    default: [],
  },
  prevention: {
    type: [String],
    default: [],
  },
  treatment: {
    type: [String],
    default: [],
  },
});

const PredictionSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    prediction: {
      plant: { type: String, required: true },
      disease: { type: String, required: true },
      confidence: { type: Number, required: true },
      isHealthy: {
        type: Boolean,
        required: true,
      },
      diseaseInfo: {
        type: DiseaseInfoSchema,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;
