const express = require("express");
const router = express.Router();
const controller = require("../controllers/chatbotHistory.controller");
const auth = require("../middlewares/auth");

// Protected routes
router.post("/", auth, controller.createHistory);
router.get("/", auth, controller.getMyHistory);
router.delete("/:id", auth, controller.deleteHistoryById);
router.delete("/", auth, controller.clearMyHistory);

module.exports = router;
