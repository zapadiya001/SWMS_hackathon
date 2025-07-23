const express = require("express");
const router = express.Router();
const controller = require("../controllers/garbageCollector.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.use(auth);

// Public and Admin
router.get("/", controller.getCollectors);
router.get("/:id", controller.getCollectorById);

// Admin-only
router.post("/", isAdmin, controller.createCollector);
router.put("/:id", isAdmin, controller.updateCollector);
router.delete("/:id", isAdmin, controller.deleteCollector);

module.exports = router;
