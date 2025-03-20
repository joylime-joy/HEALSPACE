import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("role") === "admin"; // Check if the user is an admin

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Welcome Message */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
        Welcome to HealSpace
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Your mental health and wellness partner.
      </p>

      {/* Buttons for Navigation */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Login Button */}
        <button
          onClick={() => navigate("/auth")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        {/* Signup Button */}
        <button
          onClick={() => navigate("/auth?mode=signup")}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Sign Up
        </button>

        {/* Services Button */}
        <button
          onClick={() => navigate("/services")}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          View Services
        </button>

        {/* Admin Dashboard Button (Visible only to admins) */}
        {isAdmin && (
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Admin Dashboard
          </button>
        )}
      </div>

      {/* Optional: Additional Content */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose HealSpace?
        </h2>
        <p className="text-gray-600 max-w-2xl">
          HealSpace provides a safe and supportive environment for mental health and wellness. Whether you're looking for therapy sessions, resources, or tools to improve your mental health, we're here to help.
        </p>
      </div>
    </div>
  );
};

export default Home;