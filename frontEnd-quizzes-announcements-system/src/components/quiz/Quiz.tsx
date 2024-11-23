import { Delete, Edit } from "@mui/icons-material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { cyan, red } from "@mui/material/colors";
import Typography from "@mui/material/Typography/Typography";
import { QuizProps } from "../../interfaces/QuizProps";
const Quiz: React.FC<QuizProps> = ({
  _id,
  title,
  course,
  topic,
  date,
  setQuizId,
  setOpen,
  setOpenDelete,
}) => (
  <Box
    sx={{
      flex: 1,
      minWidth: { xl: 350 },
      border: 1,
      borderColor: cyan[900],
      p: 2,
    }}
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ display: "flex", alignItems: "center", mb: 2 }}
    >
      <DateRangeIcon sx={{ color: cyan[900] }} fontSize="large" />{" "}
      <span>{title}</span>
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {course}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Topic: {topic}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Due Date: {new Date(date).toLocaleDateString()}
    </Typography>
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: cyan[900] }}
        startIcon={<Edit />}
        onClick={() => {
          setQuizId(_id);
          setOpen(true);
        }}
      >
        edit
      </Button>

      <Button
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: red[900] }}
        startIcon={<Delete />}
        onClick={() => {
          setQuizId(_id);
          setOpenDelete(true);
        }}
      >
        delete
      </Button>
    </Box>
  </Box>
);
export default Quiz;
