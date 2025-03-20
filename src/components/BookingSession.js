import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingSession = () => {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch available therapists
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/therapists/available");
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    fetchTherapists();
  }, []);

  // Handle therapist selection
  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setAvailableSlots(therapist.availability);
  };

  // Handle booking submission
  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!selectedTherapist || !selectedDate || !selectedTime) {
      alert("Please select a therapist, date, and time.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings/book",
        {
          therapistId: selectedTherapist._id,
          userId: localStorage.getItem("userId"), // Assuming you store the user ID in localStorage
          date: selectedDate,
          startTime: selectedTime,
          endTime: selectedTime, // You can adjust this based on your logic
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Session booked successfully!");
      console.log("Response:", response.data);
      navigate("/dashboard"); // Redirect to the dashboard after booking
    } catch (error) {
      console.error("Error booking session:", error);
      alert("Error booking session. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book a Session</h1>

      {/* Therapist Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Select a Therapist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {therapists.map((therapist) => (
            <div
              key={therapist._id}
              className={`bg-white p-4 rounded-lg shadow-md cursor-pointer ${
                selectedTherapist?._id === therapist._id ? "border-2 border-blue-600" : ""
              }`}
              onClick={() => handleTherapistSelect(therapist)}
            >
              <img
                src={therapist.photo}
                alt={therapist.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-bold">{therapist.name}</h3>
              <p className="text-gray-600">{therapist.specialization}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Availability and Booking Form */}
      {selectedTherapist && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Book with {selectedTherapist.name}</h2>
          <form onSubmit={handleBookSession}>
            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            {/* Time Selection */}
            <div className="mb-4">
              <label className="block text-gray-700">Select Time</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="">Select a time</option>
                {availableSlots
                  .filter((slot) => slot.date === selectedDate)
                  .map((slot, index) => (
                    <option key={index} value={slot.startTime}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Book Session
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingSession;