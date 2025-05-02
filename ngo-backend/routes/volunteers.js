const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const nodemailer = require("nodemailer");

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, program } = req.body;

    if (!name || !email || !program) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const volunteer = new Volunteer({ name, email, program });
    await volunteer.save();

    // ✅ Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Volunteer Signup Received",
      text: `Hi ${name},\n\nThank you for signing up to volunteer for "${program}". Our team will review your application and reach out to you soon.\n\n– Bright Future Team`
    });

    res.status(201).send(volunteer);
  } catch (err) {
    console.error("Failed to save volunteer:", err);
    res.status(500).send({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const volunteers = await Volunteer.find();
  res.send(volunteers);
});

module.exports = router;