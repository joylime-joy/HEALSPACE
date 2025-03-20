import express from "express";
import Chat from "../models/chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Send Message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const chat = new Chat({ senderId: req.user.id, receiverId, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Messages
router.get("/messages/:receiverId", authMiddleware, async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.receiverId },
        { senderId: req.params.receiverId, receiverId: req.user.id },
      ],
    }).sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
