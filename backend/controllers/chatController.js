import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const chat = new Chat({ senderId: req.user.id, receiverId, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
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
};
 
