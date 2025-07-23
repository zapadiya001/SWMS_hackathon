const CartItem = require("../models/cartItem.model");

// Add or Update Cart Item
exports.addToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.user._id;

	try {
		const existing = await CartItem.findOne({ userId, productId });

		if (existing) {
			existing.quantity += quantity;
			await existing.save();
			return res.status(200).json({ success: true, data: existing });
		}

		const item = await CartItem.create({ userId, productId, quantity });
		res.status(201).json({ success: true, data: item });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Get All Cart Items for User
exports.getUserCart = async (req, res) => {
	const userId = req.user._id;

	try {
		const items = await CartItem.find({ userId }).populate("productId");
		res.status(200).json({ success: true, data: items });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Update Quantity
exports.updateQuantity = async (req, res) => {
	const { quantity } = req.body;
	const { productId } = req.params;
	const userId = req.user._id;

	try {
		const item = await CartItem.findOneAndUpdate(
			{ userId, productId },
			{ $set: { quantity } },
			{ new: true, runValidators: true }
		);
		if (!item) return res.status(404).json({ success: false, message: "Cart item not found" });
		res.status(200).json({ success: true, data: item });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Remove a Product from Cart
exports.removeFromCart = async (req, res) => {
	const { productId } = req.params;
	const userId = req.user._id;

	try {
		const removed = await CartItem.findOneAndDelete({ userId, productId });
		if (!removed) return res.status(404).json({ success: false, message: "Item not found" });
		res.status(200).json({ success: true, message: "Item removed from cart" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Clear Entire Cart
exports.clearCart = async (req, res) => {
	const userId = req.user._id;

	try {
		await CartItem.deleteMany({ userId });
		res.status(200).json({ success: true, message: "Cart cleared" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
