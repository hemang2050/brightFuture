// routes/donations.js
const express = require("express");
const router = express.Router();
const Donation = require("../models/donation_temp"); // Fix: Use the correct case "Donation" instead of "donation"

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const donation = new Donation({ name, email, amount });
    await donation.save();

    res.status(201).json(donation);
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/donations
// @desc    Get all donations (latest first)
// @access  Public or Admin-only (can add auth middleware later)
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;