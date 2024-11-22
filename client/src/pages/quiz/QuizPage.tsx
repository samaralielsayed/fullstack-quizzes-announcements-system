import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Quiz from "../../components/quiz/Quiz";
import Stack from "@mui/material/Stack/Stack";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useQuiz from "../../hooks/useQuiz";
import Button from "@mui/material/Button/Button";
import { cyan } from "@mui/material/colors";
import Box from "@mui/material/Box/Box";
import { useState } from "react";
import AddQuizDialog from "../../components/quiz/AddQuizDialog";
import DeleteDialog from "../../components/quiz/DeleteDialog";

const QuizPage = () => {
  const {
    isLoading,
    quizData,
    setRender,
    handleDeleteQuiz,
    openDelete,
    handleCloseDelete,
    setOpenDelete,
  } = useQuiz();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quizId, setQuizId] = useState("");
  console.log("quizData", quizId);
  return (
    <>
      <Grid item xs={12} lg={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            What's due
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: cyan[900] }}
            startIcon={<ControlPointIcon />}
            onClick={handleOpen}
          >
            Add New Quiz
          </Button>
        </Box>
        <Stack direction="column" spacing={3}>
          {quizData.map((quiz) => (
            <Quiz
              key={quiz._id}
              _id={quiz._id}
              title={quiz.title}
              course={quiz.course}
              topic={quiz.topic}
              date={quiz.date}
              setQuizId={setQuizId}
              setOpen={setOpenEdit}
              setOpenDelete={setOpenDelete}
            />
          ))}
        </Stack>
      </Grid>

      {quizId && openEdit && (
        <AddQuizDialog
          open={openEdit}
          handleClose={() => {
            setOpenEdit(false);
            setQuizId("");
          }}
          setRender={setRender}
          ID={quizId}
        />
      )}
      {open && (
        <AddQuizDialog
          open={open}
          handleClose={handleClose}
          setRender={setRender}
        />
      )}
      {openDelete && quizId && (
        <DeleteDialog
          open={openDelete}
          title="Delete Quize"
          message="Are you sure you want to delete this quiz?"
          handleClose={handleCloseDelete}
          handleDelete={() => handleDeleteQuiz(quizId)}
          handledelte={isLoading}
        />
      )}
    </>
  );
};

export default QuizPage;
