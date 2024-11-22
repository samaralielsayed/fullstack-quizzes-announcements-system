const express = require("express");
const BadRequestError = require("../handleErrors/badRequestError");
const { validateNewQuiz, validateUpdateQuiz } = require("../validations/quiz");
const router = express.Router();

const quizRouter = (quizController) => {
  router.get("/", async (req, res) => {
    try {
      const getAllQuizes = await quizController.getQuizzes();
      res.status(200).json({ status: "success", data: getAllQuizes });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { error, value } = validateNewQuiz(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      const quiz = await quizController.addQuiz(req.body);
      res.status(201).json({
        status: "success",
        message: " Quiz created successfully",
        data: quiz,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await quizController.getQuizById({ _id: id });
      const { error } = validateUpdateQuiz(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }
      await quizController.editQuiz(req.params.id, req.body);
      const updateQuiz = await quizController.getQuizById({
        _id: id,
      });
      res.status(200).json({
        status: "success",
        message: " Quiz updated successfully",
        data: updateQuiz,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await quizController.getQuizById({ _id: id });
      await quizController.deleteQuiz(req.params.id);
      res
        .status(200)
        .json({ status: "success", message: "Quiz deleted successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const quiz = await quizController.getQuizById({
        _id: id,
      });
      res.status(200).json({
        status: "success",
        message: "Quiz founded",
        data: quiz,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  });

  return router;
};

module.exports = quizRouter;
