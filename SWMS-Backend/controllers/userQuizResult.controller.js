const UserQuizResult = require("../models/userQuizResult.model");

exports.submitQuizResult = async (req, res) => {
  try {
    const {
      user,
      quiz,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      isCompleted,
      startedAt,
      completedAt
    } = req.body;

    // 🔧 Default to 1 if not passed
    const attemptNumber = req.body.attemptNumber || 1;

    const result = await UserQuizResult.create({
      user,
      quiz,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      attemptNumber,
      isCompleted,
      startedAt,
      completedAt
    });

    res.status(201).json({
      success: true,
      message: "Quiz result submitted successfully",
      resultId: result._id
    });
  } catch (error) {
    console.error("❌ Error saving quiz result:", error.message);
    console.error(error); // full error stack
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz result",
      error: error.message
    });
  }
};


exports.getQuizResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserQuizResult.findById(id)
      .populate("user", "name email")
      .populate("quiz", "title category")
      .populate("answers.question", "questionText options correctOption");

    if (!result) {
      return res.status(404).json({ success: false, message: "Result not found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    res.status(500).json({ success: false, message: "Error retrieving result" });
  }
};

// GET /userQuizResult/next-attempt/:userId/:quizId
exports.getNextAttemptNumber = async (req, res) => {
  try {
    const { userId, quizId } = req.params;
    const lastAttempt = await UserQuizResult.findOne({ user: userId, quiz: quizId })
      .sort({ attemptNumber: -1 });

    const nextAttempt = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;
    res.json({ success: true, nextAttempt });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get attempt number" });
  }
};

exports.getResultsByQuizAndUser = async (req, res) => {
  try {
    const { quizId, userId } = req.params;

    const results = await UserQuizResult.find({
      quiz: quizId,
      user: userId
    })
      .sort({ attemptNumber: 1 }) // optional: order by attempt
      .populate("quiz", "title category")
      .populate("user", "name email")
      .populate("answers.question", "questionText options correctOption");

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("❌ Error fetching quiz results by quizId and userId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch results",
      error: error.message
    });
  }
};