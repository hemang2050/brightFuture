// src/pages/Donate.jsx
import React, { useState } from "react";
import { Gift } from "lucide-react";

export const Donate = () => {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    amount: ""
  });
  const [donated, setDonated] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => v.trim() === "")) {
      alert("Please fill out all fields.");
      return;
    }
    setProcessing(true);
  
    try {
      await fetch("https://brightfuture-jnvf.onrender.com/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setProcessing(false);
      setDonated(true);
    } catch (err) {
      alert("Failed to donate. Try again later.");
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
        <form onSubmit={handleDonate} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Cardholder Name"
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            maxLength={19}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-1/2 border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <input
              type="password"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="CVV"
              maxLength={3}
              className="w-1/2 border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Donation Amount (USD)"
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-purple-600 text-white py-3 rounded font-semibold hover:bg-purple-700 transition"
          >
            {processing ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  );
};