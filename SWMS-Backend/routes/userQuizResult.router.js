const express = require("express");
const router = express.Router();
const controller = require("../controllers/userQuizResult.controller");

router.post("/submit", controller.submitQuizResult);
router.get("/:id", controller.getQuizResultById);
router.get("/next-attempt/:userId/:quizId", controller.getNextAttemptNumber);
router.get("/:quizId/:userId", controller.getResultsByQuizAndUser);

module.exports = router;