const mongoose = require("mongoose");

const wasteClassificationSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	imageUrl: {
		type: String,
		required: [true, "Image URL is required"],
		trim: true
	},
	predictedClass: {
		type: String,
		required: [true, "Predicted class is required"],
		enum: ['metal', 'paper', 'biological', 'plastic', 'glass']
	},
	tips: {
		type: String,
		trim: true,
		maxlength: [1000, "Tips must be under 1000 characters"]
	}
}, {
	timestamps: true
});

wasteClassificationSchema.index({ userId: 1 });
wasteClassificationSchema.index({ predictedClass: 1 });
wasteClassificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("WasteClassificationHistory", wasteClassificationSchema);
