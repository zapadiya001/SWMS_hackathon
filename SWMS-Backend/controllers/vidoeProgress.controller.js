// controllers/userVideoProgress.controller.js
const VideoProgress = require("../models/videoProgress.model");

exports.markVideoAsWatched = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.user.id; // Assumes user is authenticated and `req.user` is available

    const result = await VideoProgress.findOneAndUpdate(
      { userId, videoId },
      { watched: true, watchedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: result, message: "Video marked as watched" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
