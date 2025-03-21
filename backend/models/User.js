import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as needed
});

// Check if the model is already compiled
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;