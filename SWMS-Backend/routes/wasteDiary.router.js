const express = require("express");
const router = express.Router();
const controller = require("../controllers/wasteDiary.controller");
const auth = require("../middlewares/auth");

router.use(auth);

router.post("/", controller.addEntry);
router.get("/", controller.getAllEntries);
router.get("/summary/daily", controller.getDailySummary);
router.get("/summary/weekly", controller.getWeeklySummary);
router.delete("/:id", controller.deleteEntry);

module.exports = router;
