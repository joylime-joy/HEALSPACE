import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Admin Login
export const loginAdmin = async (req, res) => {
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
};