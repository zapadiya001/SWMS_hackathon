const TrashSellRequest = require("../models/trashSellRequest.model");

// Create new request
exports.createRequest = async (req, res) => {
	try {
		const payload = { ...req.body, userId: req.user._id };
		const request = await TrashSellRequest.create(payload);
		res.status(201).json({ success: true, data: request });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Get all requests for current user
exports.getMyRequests = async (req, res) => {
	try {
		const requests = await TrashSellRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: requests });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get all requests (admin only)
exports.getAllRequests = async (req, res) => {
	try {
		const requests = await TrashSellRequest.find().populate("userId", "name email");
		res.status(200).json({ success: true, data: requests });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Update request status (admin)
exports.updateStatus = async (req, res) => {
	try {
		const { status, ecoPointsEarned } = req.body;
		const updated = await TrashSellRequest.findByIdAndUpdate(
			req.params.id,
			{ status, ecoPointsEarned },
			{ new: true, runValidators: true }
		);
		if (!updated) return res.status(404).json({ success: false, message: "Request not found" });
		res.status(200).json({ success: true, data: updated });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Delete a request
exports.deleteRequest = async (req, res) => {
	try {
		const deleted = await TrashSellRequest.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
		if (!deleted) return res.status(404).json({ success: false, message: "Request not found" });
		res.status(200).json({ success: true, message: "Request deleted" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
