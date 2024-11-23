import React, { useContext } from "react";
import { Typography, Box, Button, AppBar } from "@mui/material";
import { cyan } from "@mui/material/colors";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LanguageIcon from "@mui/icons-material/Language";
import LanguageToggle from "../components/share/LanguageToggle";
import { LanguageContext } from "../providers/LanguageContext";
interface HomeProps {
  handleLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogin }) => {
  const { t } = useContext(LanguageContext);
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
              color: cyan[900],
            }}
          >
            <LanguageIcon fontSize="medium" />
            {t("home.title")}
          </Typography>
          <LanguageToggle />
        </Box>
      </AppBar>

      <Box
        sx={{
          backgroundColor: "background.default",
          width: "100%",
          height: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            margin: 0,
            fontWeight: "bold",
            color: cyan[900],
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {t("home.welcomeBack")} <WavingHandIcon fontSize="large" />
        </Typography>
        <Button
          variant="outlined"
          sx={{
            color: cyan[900],
            borderColor: cyan[900],
            fontWeight: "bold",
            border: 2,
            width: "150px",
            "&:hover": {
              backgroundColor: cyan[900],
              color: "#fff",
            },
          }}
          size="large"
          onClick={handleLogin}
        >
          {t("home.login")}
        </Button>
      </Box>
    </>
  );
};

export default Home;
