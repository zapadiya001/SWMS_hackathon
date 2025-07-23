const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const controller = require("../controllers/notification.controller");

router.use(auth);

// User routes
router.get("/my", controller.getMyNotifications);
router.patch("/mark/:id", controller.markAsRead);
router.patch("/mark-all", controller.markAllAsRead);

// Admin route
router.post("/", isAdmin, controller.createNotification);
router.delete("/:id", isAdmin, controller.deleteNotification);

module.exports = router;
