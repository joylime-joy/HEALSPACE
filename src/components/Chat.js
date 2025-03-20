import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat/send",
        { message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages([...messages, response.data.message]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Live Chat</h2>
        <div className="h-64 overflow-y-auto border p-4 rounded-lg mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <p key={index} className="text-gray-600">
              {msg}
            </p>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;