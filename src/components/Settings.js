import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const [notificationPreference, setNotificationPreference] = useState("Email Notifications");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/settings",
        {
          notificationPreference,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Settings updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Error updating settings. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Settings
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Notification Preferences</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={notificationPreference}
              onChange={(e) => setNotificationPreference(e.target.value)}
            >
              <option>Email Notifications</option>
              <option>Push Notifications</option>
              <option>Both</option>
              <option>None</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Change Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;