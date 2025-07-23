const Quiz = require("../models/quiz.model");

// Create a new quiz question
exports.createQuiz = async (req, res) => {
	try {
		const quiz = await Quiz.create(req.body);
		res.status(201).json({ success: true, data: quiz });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Get all quiz questions
exports.getAllQuizzes = async (req, res) => {
	try {
		const quizzes = await Quiz.find().sort({ createdAt: -1 });
		res.status(200).json({ success: true, data: quizzes });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

// Get single quiz by ID
exports.getQuizById = async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
		res.status(200).json({ success: true, data: quiz });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Update quiz question
exports.updateQuiz = async (req, res) => {
	try {
		const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!updated) return res.status(404).json({ success: false, message: "Quiz not found" });
		res.status(200).json({ success: true, data: updated });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
};

// Delete quiz question
exports.deleteQuiz = async (req, res) => {
	try {
		const deleted = await Quiz.findByIdAndDelete(req.params.id);
		if (!deleted) return res.status(404).json({ success: false, message: "Quiz not found" });
		res.status(200).json({ success: true, message: "Quiz deleted successfully" });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};
