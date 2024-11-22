import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExamsImage from "/exam.svg";
import cyan from "@mui/material/colors/cyan";
import { grey } from "@mui/material/colors";

const ExemTime = () => {
  return (
    <>
      <Paper variant="elevation" sx={{ p: 5, my: 10 }}>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
              EXAMS TIME
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ width: { xs: "100%", md: "80%", color: grey[900] } }}
            >
              Here we are, Are you ready to fight? Don’t worry, we prepared some
              tips to be ready for your exams.
            </Typography>
            <Typography variant="body2" sx={{ my: 2, color: grey[600] }}>
              "Nothing happens until something moves" - Albert Einstein
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: cyan[900] }}>
              View exams tips
            </Button>
          </Box>
          <Box
            component="img"
            src={ExamsImage}
            alt="exams"
            sx={{ width: 300, height: { xs: 300, md: 300 } }}
          />
        </Stack>
      </Paper>
    </>
  );
};

export default ExemTime;
