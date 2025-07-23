// controllers/ecoCalendar.controller.js
const EcoCalendar = require("../models/ecoCalendar.model");

// GET eco calendar for user
exports.getEcoCalendar = async (req, res) => {
  try {
    const calendar = await EcoCalendar.findOne({ user: req.params.userId });
    if (!calendar) {
      return res.status(404).json({ message: "Eco Calendar not found" });
    }
    res.status(200).json(calendar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST or initialize calendar for user
exports.createOrUpdateEcoCalendar = async (req, res) => {
  try {
    const { userId } = req.params;
    const { dailyTasks, weeklyTasks, streak } = req.body;

    let calendar = await EcoCalendar.findOne({ user: userId });

    if (!calendar) {
      calendar = await EcoCalendar.create({ user: userId, dailyTasks, weeklyTasks, streak });
      return res.status(201).json(calendar);
    }

    calendar.dailyTasks = dailyTasks || calendar.dailyTasks;
    calendar.weeklyTasks = weeklyTasks || calendar.weeklyTasks;
    calendar.streak = streak !== undefined ? streak : calendar.streak;

    await calendar.save();
    res.status(200).json(calendar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
