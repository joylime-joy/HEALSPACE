import express from "express";
import { registerTherapist, getTherapists } from "../controllers/therapistController.js"; // Correct imports
import authMiddleware from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all therapists (available for booking)
router.get("/", getTherapists);

// Register a therapist (admin-only)
router.post("/register", authMiddleware, isAdmin, registerTherapist);

export default router;