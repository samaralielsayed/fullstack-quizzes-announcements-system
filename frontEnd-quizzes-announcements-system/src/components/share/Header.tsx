import React from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { cyan, grey, red } from "@mui/material/colors";

const drawerWidth = 280;

interface HeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleLogout: () => void;
}

interface AppBarProps extends React.ComponentProps<typeof MuiAppBar> {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Header: React.FC<HeaderProps> = ({
  open,
  handleDrawerOpen,
  handleLogout,
}) => {
  const currentLang = location.pathname.split("/")[1] || "en";

  return (
    <StyledAppBar
      position="fixed"
      open={open}
      sx={(theme) => ({
        backgroundColor: "#fff",

        color: grey[800],
        ...(open && {
          [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: `${currentLang == "ar" ? drawerWidth : 0}px`,
            marginLeft: `${currentLang == "en" ? drawerWidth : 0}px`,
          },
        }),
        height: "80px",
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: `${currentLang == "ar" ? "2px" : "px"}`,
            ml: `${currentLang == "ar" ? "2px" : "0"}`,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
        >
          Welcome,{" "}
          <Typography
            component="span"
            sx={{ color: cyan[900], fontWeight: "bold", fontSize: "1.25rem" }}
          >
            Samar
          </Typography>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          sx={{ backgroundColor: red[900], mx: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>

        <IconButton sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
