const mongoose = require("mongoose");

const trashSellRequestSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	trashImageUrl: {
		type: String,
		required: [true, "Trash image URL is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"],
		minlength: [10, "Description must be at least 10 characters"],
		maxlength: [500, "Description must be under 500 characters"]
	},
	address: {
		type: String,
		required: [true, "Address is required"],
		minlength: [10, "Address must be at least 10 characters"]
	},
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected', 'completed'],
		default: 'pending'
	},
	ecoPointsEarned: {
		type: Number,
		default: 0,
		min: [0, "Eco Points cannot be negative"]
	}
}, {
	timestamps: true
});

trashSellRequestSchema.index({ userId: 1 });
trashSellRequestSchema.index({ status: 1 });
trashSellRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model("TrashSellRequest", trashSellRequestSchema);
