const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects (programs)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({}, "name area"); // only fetch required fields
    res.status(200).send(projects);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    res.status(500).send({ error: "Server error" });
  }
});

// Optional: Create a project (for testing)
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).send({ error: "Failed to create project" });
  }
});

module.exports = router;