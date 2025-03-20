import User from "../models/User.js";

// Fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.userId);

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};