import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import BookingSession from "./components/BookingSession";
import TherapistRegistration from "./components/TherapistRegistration";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Resources from "./components/Resources";
import Auth from "./components/Auth";
import Services from "./components/Services";
import AdminDashboard from "./components/AdminDashboard"; // Import the AdminDashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Root Path) */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Route with Nested Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<BookingSession />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Therapist Registration */}
        <Route path="/therapist-registration" element={<TherapistRegistration />} />

        {/* Authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;