const ChatbotHistory = require("../models/chatbotHistory.model");

// Create a new chatbot history entry
exports.createHistory = async (req, res) => {
	try {
		const { message, response } = req.body;
		const userId = req.userId;

		const history = await ChatbotHistory.create({ userId, message, response });
		res.status(201).json({ success: true, data: history });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get all chatbot history for the logged-in user
exports.getMyHistory = async (req, res) => {
	try {
		const history = await ChatbotHistory.find({ userId: req.userId }).sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: history });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Delete a specific chatbot history entry by ID
exports.deleteHistoryById = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await ChatbotHistory.findOneAndDelete({ _id: id, userId: req.userId });

		if (!deleted) {
			return res.status(404).json({ success: false, message: "History not found or unauthorized" });
		}

		res.status(200).json({ success: true, message: "Chatbot history entry deleted" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Delete all chatbot history for the logged-in user
exports.clearMyHistory = async (req, res) => {
	try {
		await ChatbotHistory.deleteMany({ userId: req.userId });
		res.status(200).json({ success: true, message: "All chatbot history cleared" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
