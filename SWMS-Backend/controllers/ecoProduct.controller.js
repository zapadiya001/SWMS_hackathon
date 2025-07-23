const EcoProduct = require("../models/ecoProduct.model");

// Create
exports.createProduct = async (req, res) => {
	try {
		const product = await EcoProduct.create(req.body);
		res.status(201).json({ success: true, data: product });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Get All
exports.getAllProducts = async (req, res) => {
	try {
		const products = await EcoProduct.find().sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: products });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get by ID
exports.getProductById = async (req, res) => {
	try {
		const product = await EcoProduct.findById(req.params.id);
		if (!product) return res.status(404).json({ success: false, message: "Product not found" });
		res.status(200).json({ success: true, data: product });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Update
exports.updateProduct = async (req, res) => {
	try {
		const updated = await EcoProduct.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		if (!updated) return res.status(404).json({ success: false, message: "Product not found" });
		res.status(200).json({ success: true, data: updated });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Delete
exports.deleteProduct = async (req, res) => {
	try {
		const deleted = await EcoProduct.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
		res.status(200).json({ success: true, message: "Product deleted successfully" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
