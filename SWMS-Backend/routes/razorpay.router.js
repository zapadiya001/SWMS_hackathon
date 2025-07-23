//equire("dotenv").config(); // 🔥 must be first line

const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

console.log("🔑 Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔐 Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET? "Loaded ✅" : "Missing ❌");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: true, message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    console.log("✅ Order Created:", order);
    return res.json({ success: true, order });
  } catch (error) {
  console.error("❌ Razorpay Error (Full):", error); // 🔥 Log full error object

  return res.status(500).json({
    error: true,
    message: "Failed to create order",
    details: error.message, // 👈 include details for debugging
  });
}
});

module.exports = router;
