import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  // Fetch all therapists
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/therapists", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchTherapists();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Add Therapist Button */}
      <button
        onClick={() => navigate("/admin/add-therapist")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-700 transition duration-300"
      >
        Add Therapist
      </button>

      {/* List of Therapists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <div
            key={therapist._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-bold mb-2">{therapist.name}</h2>
            <p className="text-gray-600 mb-2">{therapist.specialization}</p>
            <p className="text-gray-600 mb-4">{therapist.email}</p>
            <button
              onClick={() => navigate(`/admin/edit-therapist/${therapist._id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:5000/api/admin/therapists/${therapist._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                  });
                  setTherapists(therapists.filter((t) => t._id !== therapist._id));
                } catch (error) {
                  console.error("Error deleting therapist:", error);
                }
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;