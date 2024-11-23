require("dotenv").config();
require("./db");
const cors = require("cors");

const express = require("express");
const app = express();

const mainRouter = express.Router();
const NotFoundError = require("./handleErrors/notFoundError");

// Importing repositories
const QuizRepository = require("./repositories/quiz");
const AnnouncementRepository = require("./repositories/announcement");

// Importing controllers
const QuizController = require("./controllers/quiz");
const AnnouncementController = require("./controllers/announcement");

// Importing routers
const quizRouter = require("./routes/quiz");
const announcementRouter = require("./routes/announcement");

app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

// Creating instances of repositories
const quizRepository = new QuizRepository();
const announcementRepository = new AnnouncementRepository();
// Creating instances of controllers
const quizController = new QuizController(quizRepository);
const announcementController = new AnnouncementController(
  announcementRepository
);

// routers with controllers
mainRouter.use("/quizzes", quizRouter(quizController));
mainRouter.use("/announcements", announcementRouter(announcementController));

//if router not found will display this message
app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
