const mongoose = require("mongoose");

const educationVideoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
		minlength: [5, "Title must be at least 5 characters"],
		maxlength: [100, "Title must be at most 100 characters"]
	},
	description: {
		type: String,
		//required: [true, "Description is required"],
		minlength: [10, "Description must be at least 10 characters"],
		maxlength: [500, "Description must be at most 500 characters"]
	},
	videoUrl: {
		type: String,
		required: [true, "Video URL is required"],
		trim: true
	},
	thumbnailUrl: {
		type: String,
		trim: true
	},
}, {
	timestamps: true
});

educationVideoSchema.index({ order: 1 });
educationVideoSchema.index({ createdAt: -1 });

module.exports = mongoose.model("EducationVideo", educationVideoSchema);
