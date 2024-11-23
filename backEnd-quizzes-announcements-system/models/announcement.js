const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [255, "Name cannot exceed 255 characters"],
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username cannot exceed 50 characters"],
  },
  image: {
    type: String,
    required: [true, "Please upload an image"],
    default: "default.jpg",
    maxlength: [2048, "Image URL cannot exceed 2048 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [3, "Description must be at least 3 characters long"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [255, "Title cannot exceed 255 characters"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;
