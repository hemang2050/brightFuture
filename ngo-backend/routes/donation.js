const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation")

// Create a new donation
router.post("/", async (req, res) => {
  try {
    const { name, email, amount } = req.body;
    const donation = new Donation({ name, email, amount });
    await donation.save();
    res.status(201).send(donation);
  } catch (err) {
    console.error("Error saving donation:", err);
    res.status(500).send({ error: "Server error" });
  }
});

// Get all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.send(donations);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;