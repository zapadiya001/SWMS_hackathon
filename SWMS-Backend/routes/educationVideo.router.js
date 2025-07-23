const express = require("express");
const router = express.Router();
const controller = require("../controllers/educationVideo.controller");
const auth = require("../middlewares/auth");

// Public for now (or use auth as needed)
router.post("/", auth, controller.createVideo);
router.get("/", controller.getAllVideos);
router.get("/:id", controller.getVideoById);
router.put("/:id", auth, controller.updateVideo);
router.delete("/:id", auth, controller.deleteVideo);

module.exports = router;
