// assign.js
const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const Project = require('../models/Project');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ROUTE 1 — Assign volunteer to a project
router.post('/', async (req, res) => {
  const { volunteerId, projectId } = req.body;

  const volunteer = await Volunteer.findById(volunteerId);
  const project = await Project.findById(projectId);

  if (!volunteer || !project) {
    return res.status(404).send("Invalid volunteer or project ID");
  }

  volunteer.assignedProject = project._id;
  await volunteer.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: volunteer.email,
    subject: "You've been assigned to a project!",
    text: `Hi ${volunteer.name},\n\nYou're now assigned to: ${project.name} in ${project.area}.\n\nThank you!`
  });

  res.send({ message: "Volunteer assigned and email sent." });
});

// ✅ ROUTE 2 — Approve/reject volunteer and send email
router.post('/update-status', async (req, res) => {
  const { volunteerId, status } = req.body;
  console.log("Received update request:", volunteerId, status); // <-- Add this

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).send({ error: "Invalid status" });
  }

  try {
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      console.log("Volunteer not found for ID:", volunteerId); // <-- Add this
      return res.status(404).send({ error: "Volunteer not found" });
    }

    volunteer.status = status;
    await volunteer.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: volunteer.email,
      subject: "Volunteer Application Status",
      text: `Hi ${volunteer.name},\n\nYour application for '${volunteer.program}' has been ${status}.\n\nThanks,\nBright Future Team`
    });

    res.send({ message: `Volunteer ${status}` });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;