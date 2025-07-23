const QuizQuestion = require("../models/quizQuestions.model");

// Create a new quiz question
exports.createQuizQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all quiz questions (with optional filters)
exports.getAllQuizQuestions = async (req, res) => {
  try {
    const filters = {};
    const { category, difficulty, createdBy } = req.query;

    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (createdBy) filters.createdBy = createdBy;

    const questions = await QuizQuestion.find(filters).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single quiz question by ID
exports.getQuizQuestionById = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a quiz question
exports.updateQuizQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete a quiz question
exports.deleteQuizQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all questions by quizId
exports.getQuestionsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;

    const questions = await QuizQuestion.find({ quizId }).sort({ createdAt: 1 });
    if (!questions || questions.length === 0) {
      return res.status(404).json({ success: false, message: "No questions found for this quiz" });
    }

    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
