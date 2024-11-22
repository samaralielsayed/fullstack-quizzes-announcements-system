const Quiz = require("../models/quiz");
const NotFoundError = require("../handleErrors/notFoundError");

class QuizRepository {
  async getQuizzes() {
    const quizzes = await Quiz.find();
    if (!quizzes.length) {
      throw new NotFoundError("No Quizzes found");
    }
    return quizzes;
  }
  async getQuizById(id) {
    const quiz = await Quiz.findOne(id);
    if (!quiz) {
      throw new NotFoundError("The Quiz with this ID was not found");
    }
    return quiz;
  }

  async addQuiz(newQuiz) {
    return await Quiz.create(newQuiz);
  }

  async editQuiz(id, body) {
    await Quiz.updateOne({ _id: id }, body);
  }

  async deleteQuiz(id) {
    await Quiz.deleteOne({ _id: id });
  }
}

module.exports = QuizRepository;
