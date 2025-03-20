import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex">
      {/* Sidebar */}
      <aside className="bg-blue-600 w-64 p-6 shadow-lg">
        <h2 className="text-white text-3xl font-bold mb-8">HealSpace</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/booking")}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Book a Session
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/resources")}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Resources
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, John!</h1>

        {/* Outlet for Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;