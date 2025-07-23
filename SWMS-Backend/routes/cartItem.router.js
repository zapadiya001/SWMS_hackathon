const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartItem.controller");
const auth = require("../middlewares/auth");

// Cart Routes (Protected)
router.use(auth);

router.post("/", controller.addToCart);
router.get("/", controller.getUserCart);
router.put("/:productId", controller.updateQuantity);
router.delete("/:productId", controller.removeFromCart);
router.delete("/", controller.clearCart);

module.exports = router;
