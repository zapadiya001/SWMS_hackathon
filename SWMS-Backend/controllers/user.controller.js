const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, location } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, phone, location });
        res.status(201).json({ message: "User registered", user: user.profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token, user: user.profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user profile
exports.updateUser = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated", user: updated.profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
    try {
        const users = await User.findByRole(req.params.role).select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Toggle user status
exports.toggleStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.status = user.status === "active" ? "inactive" : "active";
        await user.save();
        res.status(200).json({ message: "Status toggled", status: user.status });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashed = await bcrypt.hash(newPassword, 10);
        const user = await User.findByIdAndUpdate(req.params.id, { password: hashed }, { new: true });
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.incrementQuizScore = async (req, res) => {
  try {
    const userId = req.params.id;
    const { score, correctAnswers } = req.body;  // ✅ accept both

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.quizScore = (user.quizScore || 0) + score;
    user.ecoPoints = (user.ecoPoints || 0) + (correctAnswers * 10);  // ✅ increment ecoPoints

    await user.save();

    res.status(200).json({
      success: true,
      message: "Score and EcoPoints updated",
      quizScore: user.quizScore,
      ecoPoints: user.ecoPoints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating score", error: error.message });
  }
};

// controllers/user.controller.js

exports.addEcoPointsForVideo = async (req, res) => {
    console.log("Adding eco points for video watch...");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add video ID and award points
    const ecoPointsToAdd = 50; // ✅ 50 points per video
    user.ecoPoints = (user.ecoPoints || 0) + ecoPointsToAdd;

    await user.save();

    res.status(200).json({
      success: true,
      message: `${ecoPointsToAdd} ecoPoints added`,
      ecoPoints: user.ecoPoints,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEcoPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ ecoPoints: user.ecoPoints });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
