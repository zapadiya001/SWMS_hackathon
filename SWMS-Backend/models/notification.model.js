const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title can be at most 100 characters"]
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    maxlength: [500, "Message can be at most 500 characters"]
  },
  type: {
    type: String,
    enum: ["info", "success", "warning", "error"],
    default: "info"
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String
  }
}, { timestamps: true });

notificationSchema.index({ userId: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
