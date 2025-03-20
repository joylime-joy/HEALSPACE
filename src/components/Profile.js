import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:5000/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Profile
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter new password"
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;