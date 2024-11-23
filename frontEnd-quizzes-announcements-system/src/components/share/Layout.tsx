import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "./Header";
import DrawerComponent from "./DrawerComponent";
import { useLocation } from "react-router-dom";
const drawerWidth = 280;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
  isSmallScreen?: boolean;
  langDirection?: "ltr" | "rtl";
}>(({ theme, open, isSmallScreen, langDirection }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: langDirection === "ltr" && !isSmallScreen ? drawerWidth : 0,
    marginRight: langDirection === "rtl" && !isSmallScreen ? drawerWidth : 0,
    width: isSmallScreen ? "100%" : `calc(100% - ${drawerWidth}px)`,
  }),
  ...(!open && {
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  }),
}));
interface LayoutProps {
  children: React.ReactNode;
  handleLogout: () => void;
}
const Layout: React.FC<LayoutProps> = ({ children, handleLogout }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";
  const langDirection = currentLang === "ar" ? "rtl" : "ltr";
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: langDirection }}>
      <Header
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        handleLogout={handleLogout}
      />
      <DrawerComponent
        open={open}
        handleDrawerClose={handleDrawerClose}
        isSmallScreen={isSmallScreen}
      />
      <Main
        open={open}
        isSmallScreen={isSmallScreen}
        langDirection={langDirection}
      >
        <Box sx={{ marginTop: "64px" }}>{children}</Box>
      </Main>
    </Box>
  );
};

export default Layout;
