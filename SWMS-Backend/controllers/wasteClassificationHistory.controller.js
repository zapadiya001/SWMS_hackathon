const WasteClassificationHistory = require("../models/wasteClassificationHistory.model");

// Create a new classification entry
exports.createClassification = async (req, res) => {
	try {
		const { imageUrl, predictedClass, tips } = req.body;
		const userId = req.userId;

		const entry = await WasteClassificationHistory.create({ userId, imageUrl, predictedClass, tips });
		res.status(201).json({ success: true, data: entry });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get all classification history for current user
exports.getMyClassifications = async (req, res) => {
	try {
		const history = await WasteClassificationHistory.find({ userId: req.userId }).sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: history });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Delete a single classification entry
exports.deleteClassificationById = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await WasteClassificationHistory.findOneAndDelete({ _id: id, userId: req.userId });

		if (!deleted) {
			return res.status(404).json({ success: false, message: "Entry not found or unauthorized" });
		}

		res.status(200).json({ success: true, message: "Classification entry deleted" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Clear all classification history for current user
exports.clearMyClassifications = async (req, res) => {
	try {
		await WasteClassificationHistory.deleteMany({ userId: req.userId });
		res.status(200).json({ success: true, message: "All classification history cleared" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
