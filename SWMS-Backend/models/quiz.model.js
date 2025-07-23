const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Quiz title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizQuestion"
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator is required"]
  },
  totalMarks: {
    type: Number,
    default: 0,
    min: [0, "Total marks cannot be negative"]
  },
  timeLimit: {
    type: Number, // in minutes
    min: [1, "Time limit must be at least 1 minute"],
    max: [300, "Time limit cannot exceed 300 minutes"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ["General", "Science", "Math", "History", "Tech", "Literature", "Sports"],
    default: "General"
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy"
  },
  maxAttempts: {
    type: Number,
    default: 1,
    min: [1, "Must allow at least 1 attempt"]
  },
}, {
  timestamps: true
});

// Pre-save middleware to calculate total marks
quizSchema.pre('save', async function(next) {
  if (this.isModified('questions') && this.questions.length > 0) {
    const QuizQuestion = mongoose.model('QuizQuestion');
    const questions = await QuizQuestion.find({ _id: { $in: this.questions } });
    this.totalMarks = questions.length; // Assuming 1 mark per question
  }
  next();
});

// Index for better query performance
quizSchema.index({ createdBy: 1, createdAt: -1 });
quizSchema.index({ category: 1, difficulty: 1 });
quizSchema.index({ isActive: 1 });

module.exports = mongoose.model("Quiz", quizSchema);