const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminDashboard.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// router.use(auth);     // 🔒 Require JWT for all routes
// router.use(isAdmin);  // 🔒 Only allow admin role

// Admin user management
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.delete("/:id", controller.deleteUserById);

module.exports = router;