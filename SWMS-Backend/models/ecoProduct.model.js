const mongoose = require("mongoose");

const ecoProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [3, "Minimum 3 characters required"],
      maxlength: [100, "Maximum 100 characters allowed"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Minimum 10 characters required"],
      maxlength: [1000, "Maximum 1000 characters allowed"],
    },
    imageUrl: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

// Optional indexes
ecoProductSchema.index({ name: "text", description: "text" });
ecoProductSchema.index({ price: 1 });

// ✅ Export the model
module.exports = mongoose.model("EcoProduct", ecoProductSchema);
