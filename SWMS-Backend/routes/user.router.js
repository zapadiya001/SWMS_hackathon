const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

// Public routes
router.post("/register", controller.register);
router.post("/login", controller.login);

// Protected routes (for logged-in users)
router.get("/:id", verifyToken, controller.getUserById);
router.put("/:id", verifyToken, controller.updateUser);
router.put("/:id/password", verifyToken, controller.changePassword);
router.put("/increment-score/:id", verifyToken, controller.incrementQuizScore);
router.post("/:id/watch-video",controller.addEcoPointsForVideo);
router.get("/:id/eco-points", verifyToken, controller.getEcoPoints);


// Admin-only routes
router.get("/", verifyToken, isAdmin, controller.getAllUsers);
router.get("/role/:role", verifyToken, isAdmin, controller.getUsersByRole);
router.patch("/:id/status", verifyToken, isAdmin, controller.toggleStatus);
router.delete("/:id", verifyToken, isAdmin, controller.deleteUser);

module.exports = router;
