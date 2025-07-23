const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "EducationVideo", required: true },
  watched: { type: Boolean, default: false },
  watchedAt: Date,
});

progressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model("UserVideoProgress", progressSchema);
