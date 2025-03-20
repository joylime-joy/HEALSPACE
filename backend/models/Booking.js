import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
