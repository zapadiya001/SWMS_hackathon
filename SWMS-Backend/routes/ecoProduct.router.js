const express = require("express");
const router = express.Router();
const controller = require("../controllers/ecoProduct.controller.js");
const auth = require("../middlewares/auth");

// Product Routes
router.post("/", auth, controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", auth, controller.updateProduct);
router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;
