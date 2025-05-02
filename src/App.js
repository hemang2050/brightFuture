// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { VolunteerSignup } from "./pages/VolunteerSignup";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Navbar } from "./components/Navbar";
import { Donate } from "./pages/Donate";
import { Programs } from "./pages/Programs";
import { Contact } from "./pages/Contact";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/signup" element={<VolunteerSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path='/contact' element={<Contact />} />
        <Route
          path="/dashboard"
          element={isAdmin ? <AdminDashboard /> : <AdminLogin />}
        />
      </Routes>
    </Router>
  );
}

export default App;
