import ExemTime from "../components/exemTime/ExemTime";
import Paper from "@mui/material/Paper/Paper";
import Grid from "@mui/material/Grid/Grid";
import AnouncementPage from "./announcement/AnnouncementPage";
import QuizPage from "./quiz/QuizPage";
import Box from "@mui/material/Box/Box";

const Dashboard = () => {
  return (
    <Box>
      <ExemTime />
      <Paper sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          <AnouncementPage />
          <QuizPage />
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
