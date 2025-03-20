import express from "express";
import Therapist from "../models/Therapist.js";

const router = express.Router();

// Middleware to verify admin authentication
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Add a new therapist (Admin Only)
router.post("/therapists", verifyAdmin, async (req, res) => {
  try {
    const { name, email, password, specialization, availability, photo } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new therapist
    const therapist = new Therapist({
      name,
      email,
      password: hashedPassword,
      specialization,
      availability,
      photo,
    });

    await therapist.save();
    res.status(201).json({ message: "Therapist added successfully", therapist });
  } catch (error) {
    console.error("Error adding therapist:", error);
    res.status(500).json({ message: "Error adding therapist" });
  }
});

// Get all therapists (Admin Only)
router.get("/therapists", verifyAdmin, async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).json(therapists);
  } catch (error) {
    console.error("Error fetching therapists:", error);
    res.status(500).json({ message: "Error fetching therapists" });
  }
});

// Update a therapist (Admin Only)
router.put("/therapists/:id", verifyAdmin, async (req, res) => {
  try {
    const { name, email, specialization, availability, photo } = req.body;

    const therapist = await Therapist.findByIdAndUpdate(
      req.params.id,
      { name, email, specialization, availability, photo },
      { new: true }
    );

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.status(200).json({ message: "Therapist updated successfully", therapist });
  } catch (error) {
    console.error("Error updating therapist:", error);
    res.status(500).json({ message: "Error updating therapist" });
  }
});

// Delete a therapist (Admin Only)
router.delete("/therapists/:id", verifyAdmin, async (req, res) => {
  try {
    const therapist = await Therapist.findByIdAndDelete(req.params.id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.status(200).json({ message: "Therapist deleted successfully" });
  } catch (error) {
    console.error("Error deleting therapist:", error);
    res.status(500).json({ message: "Error deleting therapist" });
  }
});

export default router;