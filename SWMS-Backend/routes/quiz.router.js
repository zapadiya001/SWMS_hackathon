const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");

router.post("/quizzes", quizController.createQuiz);
router.get("/quizzes", quizController.getAllQuizzes);

module.exports = router;