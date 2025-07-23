const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminDashboardStats.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.use(auth); // Protect all

// Admin only access
router.get("/", isAdmin, controller.getStats);
router.put("/", isAdmin, controller.updateStats);
router.patch("/reset", isAdmin, controller.resetStats);

module.exports = router;
