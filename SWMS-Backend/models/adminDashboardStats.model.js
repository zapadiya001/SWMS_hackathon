const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema({
    totalUsers: { type: Number, default: 0, min: 0 },
    totalClassifications: { type: Number, default: 0, min: 0 },
    totalVideosWatched: { type: Number, default: 0, min: 0 },
    totalQuizzesTaken: { type: Number, default: 0, min: 0 },
    totalProducts: { type: Number, default: 0, min: 0 },
    totalTrashRequests: { type: Number, default: 0, min: 0 }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: 'lastUpdated'
    }
});

dashboardStatsSchema.index({ lastUpdated: -1 });

module.exports = mongoose.model("AdminDashboardStats", dashboardStatsSchema);
