// src/pages/Contact.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill out all fields.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <Send className="text-blue-600 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h2>
        <p className="text-gray-600">We’ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Have a question, feedback, or want to get in touch? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-sm text-gray-600">
          <div className="flex items-center mb-2">
            <Mail className="mr-2 text-blue-600" size={18} />
            info@brightfuture.org
          </div>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 text-blue-600" size={18} />
            +1 (123) 456-7890
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 text-blue-600" size={18} />
            123 Hope Street, Bloomington, IN, USA
          </div>
        </div>
      </div>
    </div>
  );
};