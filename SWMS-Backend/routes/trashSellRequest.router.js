const express = require("express");
const router = express.Router();
const controller = require("../controllers/trashSellRequest.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.use(auth);

// User routes
router.post("/", controller.createRequest);
router.get("/my", controller.getMyRequests);
router.delete("/:id", controller.deleteRequest);

// Admin routes
router.get("/", isAdmin, controller.getAllRequests);
router.put("/:id", isAdmin, controller.updateStatus);

module.exports = router;
