const AdminDashboardStats = require("../models/adminDashboardStats.model");

// Get dashboard stats (only 1 latest document)
exports.getStats = async (req, res) => {
    try {
        const stats = await AdminDashboardStats.findOne().sort({ lastUpdated: -1 });
        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update stats (admin only)
exports.updateStats = async (req, res) => {
    try {
        const stats = await AdminDashboardStats.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Optionally: Reset stats
exports.resetStats = async (req, res) => {
    try {
        const reset = {
            totalUsers: 0,
            totalClassifications: 0,
            totalVideosWatched: 0,
            totalQuizzesTaken: 0,
            totalProducts: 0,
            totalTrashRequests: 0
        };
        const stats = await AdminDashboardStats.findOneAndUpdate(
            {},
            reset,
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, message: "Stats reset", data: stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
