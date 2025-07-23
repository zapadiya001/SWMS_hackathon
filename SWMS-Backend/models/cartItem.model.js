const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EcoProduct',
		required: true
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "Quantity must be at least 1"]
	}
}, {
	timestamps: true
});

cartItemSchema.index({ userId: 1 });
cartItemSchema.index({ productId: 1 });
cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
