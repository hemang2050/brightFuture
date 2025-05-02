const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  program: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  assignedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);