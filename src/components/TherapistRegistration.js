import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TherapistRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    availability: "",
    photo: null, // Store the file object
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB.");
        return;
      }
      // Validate file type (e.g., only images)
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("specialization", formData.specialization);
      formDataObj.append("availability", formData.availability);
      if (formData.photo) {
        formDataObj.append("photo", formData.photo);
      }

      const response = await axios.post("http://localhost:5000/api/therapists/register", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include admin token
        },
      });

      alert("Therapist registered successfully!");
      console.log("Response:", response.data);
      setFormData({ name: "", email: "", password: "", specialization: "", availability: "", photo: null });
      navigate("/admin"); // Redirect to admin dashboard
    } catch (error) {
      console.error("Error registering therapist:", error);
      alert("Error registering therapist. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Therapist Registration</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
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
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Specialization Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Availability Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Photo Upload Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Upload Photo (Max 2MB)</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register Therapist
        </button>
      </form>
    </div>
  );
};

export default TherapistRegistration;