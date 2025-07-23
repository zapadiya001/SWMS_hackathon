const express = require("express");
const router = express.Router();
const controller = require("../controllers/wasteClassificationHistory.controller");
const auth = require("../middlewares/auth");

// Protected routes
router.post("/", controller.createClassification);
router.get("/", controller.getMyClassifications);
router.delete("/:id", controller.deleteClassificationById);
router.delete("/", controller.clearMyClassifications);

module.exports = router;
