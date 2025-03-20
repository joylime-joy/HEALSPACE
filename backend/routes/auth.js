import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Error during user login" });
  }
});

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ message: "Error during user signup" });
  }
});

// Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, adminId: admin._id });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Error during admin login" });
  }
});

export default router;