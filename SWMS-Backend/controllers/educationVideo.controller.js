const EducationVideo = require("../models/educationVideo.model");

// Create a new video
exports.createVideo = async (req, res) => {
	try {
		const video = await EducationVideo.create(req.body);
		res.status(201).json({ success: true, data: video });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Get all videos sorted by order
exports.getAllVideos = async (req, res) => {
	try {
		const videos = await EducationVideo.find().sort({ order: 1 });
		res.status(200).json({ success: true, data: videos });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get single video by ID
exports.getVideoById = async (req, res) => {
	try {
		const video = await EducationVideo.findById(req.params.id);
		if (!video) return res.status(404).json({ success: false, message: "Video not found" });
		res.status(200).json({ success: true, data: video });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Update video
exports.updateVideo = async (req, res) => {
	try {
		const updated = await EducationVideo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!updated) return res.status(404).json({ success: false, message: "Video not found" });
		res.status(200).json({ success: true, data: updated });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Delete video
exports.deleteVideo = async (req, res) => {
	try {
		const deleted = await EducationVideo.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ success: false, message: "Video not found" });
		res.status(200).json({ success: true, message: "Video deleted successfully" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
