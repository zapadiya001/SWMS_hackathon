const express = require("express");
const router = express.Router();
const controller = require("../controllers/quizQuestions.controller");

// POST /api/quiz - create a quiz question
router.post("/", controller.createQuizQuestion);

// GET /api/quiz - get all quiz questions (with optional filters)
router.get("/", controller.getAllQuizQuestions);

// ✅ NEW: GET /api/quiz/by-quiz/:quizId - get questions by quizId
router.get("/by-quiz/:quizId", controller.getQuestionsByQuizId);

// GET /api/quiz/:id - get a single quiz question by ID
router.get("/:id", controller.getQuizQuestionById);

// PUT /api/quiz/:id - update a quiz question
router.put("/:id", controller.updateQuizQuestion);

// DELETE /api/quiz/:id - delete a quiz question
router.delete("/:id", controller.deleteQuizQuestion);

module.exports = router;
