class QuizController {
  constructor(quizRepository) {
    this.quizRepository = quizRepository;
  }
  async getQuizzes() {
    return await this.quizRepository.getQuizzes();
  }

  async getQuizById(id) {
    return await this.quizRepository.getQuizById(id);
  }
  async addQuiz(body) {
    return await this.quizRepository.addQuiz(body);
  }

  async editQuiz(id, body) {
    return await this.quizRepository.editQuiz(id, body);
  }

  async deleteQuiz(id) {
    return await this.quizRepository.deleteQuiz(id);
  }
}

module.exports = QuizController;
