// src/pages/Donate.jsx
import React, { useState } from "react";
import { Gift } from "lucide-react";

export const Donate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: ""
  });
  const [donated, setDonated] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(""); // Clear previous errors on input change
  };

  const validateForm = () => {
    // Validate name
    if (!form.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    // Validate amount (should be a positive number)
    const amountValue = parseFloat(form.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError("Please enter a valid donation amount");
      return false;
    }
    
    return true;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    setError("");
  
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        amount: parseFloat(form.amount)
      };

      const response = await fetch("https://brightfuture-jnvf.onrender.com/api/donations", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || 
          `Server returned ${response.status}: ${response.statusText}`
        );
      }
      
      setProcessing(false);
      setDonated(true);
    } catch (err) {
      console.error("Donation failed:", err);
      setError(err.message || "Failed to process donation. Please try again later.");
      setProcessing(false);
    }
  };

  if (donated) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl p-8 transform transition-all duration-500 animate-fadeIn">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-md">
              <Gift className="text-purple-500" size={36} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your generous donation will help brighten children's futures.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-md mx-auto px-6 py-10 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Make a Donation</h2>
        <p className="text-center text-gray-600 mb-6">
          Securely donate to support our mission.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleDonate} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount ($)</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount in USD"
              min="1"
              step="0.01"
              className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  );
};