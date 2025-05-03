// src/pages/Donate.jsx
import React, { useState } from "react";
import { Gift, CreditCard } from "lucide-react";

export const Donate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
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
    
    // Validate card number (simple validation - 16 digits)
    const cardNumberClean = form.cardNumber.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cardNumberClean)) {
      setError("Please enter a valid 16-digit card number");
      return false;
    }
    
    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(form.expiryDate)) {
      setError("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    
    // Validate CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(form.cvv)) {
      setError("Please enter a valid CVV");
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
      // Log the exact data being sent to help debug
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        amount: parseFloat(form.amount)
        // Note: Not sending card details to server for security purposes
        // In a real implementation, you would use a secure payment processor
      };
      console.log("Sending donation data:", payload);

      const response = await fetch("https://brightfuture-jnvf.onrender.com/api/donations", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
      
      // Log full response for debugging
      console.log("Response status:", response.status);
      
      // Get the response body regardless of status code
      const responseData = await response.json().catch(err => {
        console.error("Failed to parse response as JSON:", err);
        return null;
      });
      
      console.log("Response data:", responseData);
      
      if (!response.ok) {
        // The server returns { error: "message" } format, not { message: "error" }
        throw new Error(
          responseData?.error || 
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

  // Format credit card number with spaces
  const formatCardNumber = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      const formatted = parts.join(' ');
      setForm({ ...form, cardNumber: formatted });
    } else {
      setForm({ ...form, cardNumber: value });
    }
  };

  // Format expiry date with slash
  const formatExpiryDate = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) {
      setForm({ ...form, expiryDate: value });
    } else {
      setForm({ ...form, expiryDate: value.slice(0, 2) + '/' + value.slice(2, 4) });
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
          
          <div className="pt-4 border-t">
            <h3 className="flex items-center text-lg font-medium text-gray-800 mb-3">
              <CreditCard className="mr-2 text-purple-600" size={20} />
              Card Details
            </h3>
            
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={(e) => {
                  handleChange(e);
                  formatCardNumber(e);
                }}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                <input
                  id="expiryDate"
                  type="text"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={(e) => {
                    handleChange(e);
                    formatExpiryDate(e);
                  }}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {processing ? "Processing..." : "Donate Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};