// seedAdmin.js
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Adjust the path to your User model

const seedAdmin = async () => {
  const admin = {
    name: "Cyril",
    email: "cyril@admin.com",
    password: await bcrypt.hash("3168", 10), // Hash the password
    role: "admin",
  };

  try {
    await User.create(admin);
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

seedAdmin();