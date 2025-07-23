const mongoose = require("mongoose");

const userQuizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: [true, "Quiz is required"]
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizQuestion",
        required: true
      },
      selectedOptionIndex: {
        type: Number,
        required: true,
        min: [0, "Selected option index cannot be negative"]
      },
      isCorrect: {
        type: Boolean,
        required: true
      },
      marksAwarded: {
        type: Number,
        default: 0,
        min: [0, "Marks awarded cannot be negative"]
      }
    }
  ],
  score: {
    type: Number,
    required: true,
    min: [0, "Score cannot be negative"]
  },
  percentage: {
    type: Number,
    min: [0, "Percentage cannot be negative"],
    max: [100, "Percentage cannot exceed 100"]
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: [1, "Total questions must be at least 1"]
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: [0, "Correct answers cannot be negative"]
  },
  timeSpent: {
    type: Number, // in seconds
    min: [0, "Time spent cannot be negative"]
  },
  attemptNumber: {
    type: Number,
    default: 1,
    min: [1, "Attempt number must be at least 1"]
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate percentage
userQuizResultSchema.pre('save', function(next) {
  if (this.totalQuestions > 0) {
    this.percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
  }
  next();
});

// Compound indexes for better query performance
userQuizResultSchema.index({ user: 1, quiz: 1, attemptNumber: 1 }, { unique: true });
userQuizResultSchema.index({ user: 1, createdAt: -1 });
userQuizResultSchema.index({ quiz: 1, createdAt: -1 });

module.exports = mongoose.model("UserQuizResult", userQuizResultSchema);
