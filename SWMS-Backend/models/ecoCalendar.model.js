// models/ecoCalendar.model.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const ecoCalendarSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dailyTasks: [taskSchema],
  weeklyTasks: [taskSchema],
  streak: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model("EcoCalendar", ecoCalendarSchema);
