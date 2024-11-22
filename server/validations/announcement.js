const joi = require("joi");

const validateNewAnnouncement = (announcement) => {
  const schema = joi.object({
    name: joi.string().min(3).max(255).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 255 characters",
      "any.required": "Name is required",
    }),
    userName: joi.string().min(3).max(50).required().messages({
      "string.base": "Username must be a string",
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username cannot exceed 50 characters",
      "any.required": "Username is required",
    }),
    image: joi.string().max(2048).required().messages({
      "string.base": "Image URL must be a string",
      "string.empty": "Image URL cannot be empty",
      "string.max": "Image URL cannot exceed 2048 characters",
      "any.required": "Image URL is required",
    }),
    description: joi.string().min(10).max(1000).required().messages({
      "string.base": "Description must be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description cannot exceed 1000 characters",
      "any.required": "Description is required",
    }),
    title: joi.string().min(3).max(255).required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title cannot exceed 255 characters",
      "any.required": "Title is required",
    }),
  });
  return schema.validate(announcement);
};

const validateUpdateAnnouncement = (announcement) => {
  const schema = joi.object({
    name: joi.string().min(3).max(255).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name cannot exceed 255 characters",
    }),
    userName: joi.string().min(3).max(50).messages({
      "string.base": "Username must be a string",
      "string.empty": "Username cannot be empty",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username cannot exceed 50 characters",
    }),
    image: joi.string().max(2048).messages({
      "string.base": "Image URL must be a string",
      "string.empty": "Image URL cannot be empty",
      "string.max": "Image URL cannot exceed 2048 characters",
    }),
    description: joi.string().min(3).max(1000).messages({
      "string.base": "Description must be a string",
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 3 characters long",
      "string.max": "Description cannot exceed 1000 characters",
    }),
    title: joi.string().min(3).max(255).messages({
      "string.base": "Title must be a string",
      "string.empty": "Title cannot be empty",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title cannot exceed 255 characters",
    }),
  });
  return schema.validate(announcement);
};

module.exports = {
  validateNewAnnouncement,
  validateUpdateAnnouncement,
};
