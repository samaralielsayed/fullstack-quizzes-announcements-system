import imgLight from "/notFoundLight.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import cyan from "@mui/material/colors/cyan";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/not-found") {
      navigate("/not-found", { replace: true });
    }
  }, [location.pathname, navigate]);

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: cyan[900] }}
        onClick={goToHome}
        startIcon={<KeyboardBackspaceIcon />}
      >
        Go to Home
      </Button>
      <Box sx={{ width: "40%" }}>
        <img src={imgLight} alt="Not Found" style={{ width: "100%" }} />
      </Box>
    </Box>
  );
};

export default NotFound;
