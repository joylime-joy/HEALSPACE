import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: { type: String, required: true },
  photo: { type: String }, // Store photo URL
});

export default mongoose.model("Therapist", therapistSchema);