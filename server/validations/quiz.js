const joi = require("joi");

const validateNewQuiz = (quiz) => {
  const schema = joi.object({
    title: joi.string().min(3).max(255).required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title cannot exceed 255 characters",
      "any.required": "Title is required",
    }),
    course: joi.string().min(3).max(255).required().messages({
      "string.base": "Course must be a string",
      "string.empty": "Course cannot be empty",
      "string.min": "Course name must be at least 3 characters long",
      "string.max": "Course name cannot exceed 255 characters",
      "any.required": "Course is required",
    }),
    topic: joi.string().min(3).max(255).required().messages({
      "string.base": "Topic must be a string",
      "string.empty": "Topic cannot be empty",
      "string.min": "Topic must be at least 3 characters long",
      "string.max": "Topic cannot exceed 255 characters",
      "any.required": "Topic is required",
    }),
    date: joi.date().optional().messages({
      "date.base": "Date must be a valid date",
    }),
  });
  return schema.validate(quiz);
};

const validateUpdateQuiz = (quiz) => {
  const schema = joi.object({
    title: joi.string().min(3).max(255).messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title cannot exceed 255 characters",
    }),
    course: joi.string().min(3).max(255).messages({
      "string.base": "Course must be a string",
      "string.empty": "Course cannot be empty",
      "string.min": "Course name must be at least 3 characters long",
      "string.max": "Course name cannot exceed 255 characters",
    }),
    topic: joi.string().min(3).max(255).messages({
      "string.base": "Topic must be a string",
      "string.empty": "Topic cannot be empty",
      "string.min": "Topic must be at least 3 characters long",
      "string.max": "Topic cannot exceed 255 characters",
    }),
    date: joi.date().optional().messages({
      "date.base": "Date must be a valid date",
    }),
  });
  return schema.validate(quiz);
};

module.exports = {
  validateNewQuiz,
  validateUpdateQuiz,
};
