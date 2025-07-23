const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      minlength: [10, "Question must be at least 10 characters"],
      maxlength: [1000, "Question cannot exceed 1000 characters"],
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length >= 2 && val.length <= 6;
        },
        message: "Options must have between 2 and 6 choices",
      },
    },
    correctAnswerIndex: {
      type: Number,
      required: [true, "Correct answer index is required"],
      min: [0, "Index cannot be negative"],
      validate: {
        validator: function (val) {
          return this.options && val < this.options.length;
        },
        message: "Correct answer index must be within the options range",
      },
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz ID is required"],
    },
    explanation: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Explanation cannot exceed 500 characters"],
    },
    category: {
      type: String,
      enum: [
        "General",
        "Science",
        "Math",
        "History",
        "Tech",
        "Literature",
        "Sports",
      ],
      default: "General",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    marks: {
      type: Number,
      default: 1,
      min: [1, "Marks must be at least 1"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to trim options
quizQuestionSchema.pre("save", function (next) {
  if (Array.isArray(this.options)) {
    this.options = this.options.map((opt) => opt.trim()).filter((opt) => opt.length > 0);
  }
  next();
});

// Indexes
quizQuestionSchema.index({ quizId: 1 });
quizQuestionSchema.index({ category: 1, difficulty: 1 });
quizQuestionSchema.index({ createdBy: 1 });
quizQuestionSchema.index({ createdAt: -1 });

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
