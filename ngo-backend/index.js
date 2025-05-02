const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Updated CORS configuration
app.use(cors({
    origin: "http://localhost:3000", // ✅ Must match the frontend
    credentials: true,              // ✅ Only works with specific origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// Make sure CORS middleware is applied before routes
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/assign', require('./routes/assign'));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));