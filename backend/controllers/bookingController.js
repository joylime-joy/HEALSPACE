import Booking from "../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    const { therapistId, date, time } = req.body;
    const booking = new Booking({ userId: req.user.id, therapistId, date, time });
    await booking.save();
    res.status(201).json({ message: "Session booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("therapistId", "specialization");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 
