// routes/ecoCalendar.router.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/ecoCalendar.controller");

// /eco-calendar/:userId
router.get("/:userId", controller.getEcoCalendar);
router.post("/:userId", controller.createOrUpdateEcoCalendar);

module.exports = router;
