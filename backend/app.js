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
import AdminDashboard from "./components/AdminDashboard";
import TherapistSelection from "./components/TherapistSelection";
import UserProfile from "./components/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<BookingSession />} />
          <Route path="resources" element={<Resources />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/therapist-registration" element={<TherapistRegistration />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/therapist-selection" element={<TherapistSelection />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;