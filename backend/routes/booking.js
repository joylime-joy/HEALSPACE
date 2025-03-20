import express from "express";
import Therapist from "../models/Therapist.js";

const router = express.Router();

// Book a session with a therapist
router.post("/book", async (req, res) => {
  try {
    const { therapistId, userId, date, startTime, endTime } = req.body;

    // Find the therapist
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Check if the therapist is available at the requested time
    const isAvailable = therapist.availability.some((slot) => {
      return (
        slot.date.toISOString() === new Date(date).toISOString() &&
        slot.startTime === startTime &&
        slot.endTime === endTime
      );
    });

    if (!isAvailable) {
      return res.status(400).json({ message: "Therapist is not available at the requested time" });
    }

    // Add the booking to the therapist's schedule
    therapist.bookings.push({ userId, date, startTime, endTime });
    await therapist.save();

    res.status(201).json({ message: "Session booked successfully" });
  } catch (error) {
    console.error("Error booking session:", error);
    res.status(500).json({ message: "Error booking session" });
  }
});

export default router;