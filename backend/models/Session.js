const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Approved, Completed
});

module.exports = mongoose.model("Session", sessionSchema); 
