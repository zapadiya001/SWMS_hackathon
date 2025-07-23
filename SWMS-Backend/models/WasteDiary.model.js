const mongoose = require("mongoose");

const wasteDiarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    type: {
      type: String,
      enum: [
        "Plastic",
        "Paper",
        "Glass",
        "Metal",
        "Organic",
        "Electronic Waste",
      ],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: [0.01, "Weight must be at least 0.01 kg"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WasteDiary", wasteDiarySchema);