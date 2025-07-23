const express = require("express");
const router = express.Router();
const { markVideoAsWatched } = require("../controllers/vidoeProgress.controller");
const auth = require("../middlewares/auth"); // if using auth middleware

router.post("/watch", auth, markVideoAsWatched);

module.exports = router;
