const WasteDiary = require("../models/wasteDiary.model");

exports.addEntry = async (req, res) => {
  try {
    const { type, weight, description } = req.body;
    if (isNaN(weight) || weight <= 0) {
      return res.status(400).json({ message: "Weight must be a positive number." });
    }
    const newEntry = await WasteDiary.create({
      type,
      weight,
      description,
      user: req.user._id,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Add entry error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await WasteDiary.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error("Get all entries error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getDailySummary = async (req, res) => {
  try {
    const today = new Date();
    const past7Days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      day.setHours(0, 0, 0, 0);
      past7Days.push(day);
    }

    const entries = await WasteDiary.find({
      user: req.user._id,
      createdAt: {
        $gte: past7Days[0],
        $lte: new Date(today.setHours(23, 59, 59, 999)),
      },
    });

    const summaryMap = {};
    entries.forEach((entry) => {
      const date = new Date(entry.createdAt);
      date.setHours(0, 0, 0, 0);
      const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
      summaryMap[weekday] = (summaryMap[weekday] || 0) + entry.weight;
    });

    const dailySummary = past7Days.map((day) => {
      const weekday = day.toLocaleDateString("en-US", { weekday: "short" });
      return {
        day: weekday,
        kg: parseFloat((summaryMap[weekday] || 0).toFixed(2)),
      };
    });

    res.status(200).json(dailySummary);
  } catch (err) {
    console.error("Daily summary error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getWeeklySummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const weekCount = Math.ceil((((today - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);

    const entries = await WasteDiary.find({
      user: req.user._id,
      createdAt: {
        $gte: startOfYear,
        $lte: today,
      },
    });

    const summaryMap = {};
    entries.forEach((entry) => {
      const weekNumber = Math.ceil((((entry.createdAt - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
      summaryMap[weekNumber] = (summaryMap[weekNumber] || 0) + entry.weight;
    });

    const weeklySummary = Array.from({ length: weekCount }, (_, i) => ({
      week: `Week ${i + 1}`,
      kg: parseFloat((summaryMap[i + 1] || 0).toFixed(2)),
    }));

    res.status(200).json(weeklySummary);
  } catch (err) {
    console.error("Weekly summary error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const deletedEntry = await WasteDiary.findOneAndDelete({ _id: entryId, user: req.user._id });
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found or unauthorized." });
    }
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (err) {
    console.error("Delete entry error:", err);
    res.status(500).json({ message: "Server error." });
  }
};