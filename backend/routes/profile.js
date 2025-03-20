import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, updateUserProfile);

export default router;