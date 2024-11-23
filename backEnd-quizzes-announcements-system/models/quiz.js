const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [255, "Title cannot exceed 255 characters"],
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    minlength: [3, "Course name must be at least 3 characters long"],
    maxlength: [255, "Course name cannot exceed 255 characters"],
  },
  topic: {
    type: String,
    required: [true, "Topic is required"],
    minlength: [3, "Topic must be at least 3 characters long"],
    maxlength: [255, "Topic cannot exceed 255 characters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
