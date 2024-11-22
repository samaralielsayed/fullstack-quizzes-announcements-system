import React, { useEffect, useRef} from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import GridViewIcon from "@mui/icons-material/GridView";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import { cyan,  red } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  isSmallScreen: boolean;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  open,
  handleDrawerClose,
  isSmallScreen,
}) => {
  const theme = useTheme();
  const drawerWidth = 280;
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = location.pathname.split("/")[1] || "en";

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Schedule", icon: <EventIcon />, link: "/schedule" },
    { text: "Courses", icon: <SchoolIcon />, link: "/courses" },
    { text: "GridBoard", icon: <GridViewIcon />, link: "/gridboard" },
    { text: "Performance", icon: <BarChartIcon />, link: "/performance" },
    { text: "Announcements", icon: <CampaignIcon />, link: "/announcements" },
  ];

  useEffect(() => {
    if (isSmallScreen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          drawerRef.current &&
          !drawerRef.current.contains(event.target as Node)
        ) {
          handleDrawerClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [handleDrawerClose, isSmallScreen]);

  return (
    <div style={{ position: "relative" }}>
      {open && isSmallScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={handleDrawerClose}
        />
      )}

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? "100%" : drawerWidth,
            height: isSmallScreen ? "55%" : "100%",
            boxSizing: "border-box",
            background: cyan[900],
            color: "#fff",
            border: "none",
            zIndex: 2,
          },
        }}
        variant="persistent"
        anchor={
          isSmallScreen ? "bottom" : currentLang === "ar" ? "right" : "left"
        }
        open={open}
        ref={drawerRef}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ display: { xs: "none", md: "block" } }}
            color="inherit"
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon fontSize="large" />
            ) : (
              <ChevronRightIcon fontSize="large" />
            )}
          </IconButton>
        </DrawerHeader>
        <Typography
          variant="h4"
          sx={{
            my: { xs: 0, md: 5 },
            fontWeight: "bold",
            mx: { xs: 2, md: "auto" },
            textAlign: { xs: "left", md: "center" },
          }}
        >
          Coligo
        </Typography>
        <List>
          {menuItems.map(({ text, icon, link }) => {
            const langLink = `/${currentLang}${link}`;
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(langLink);
                  }}
                  sx={{
                    backgroundColor:
                      location.pathname === langLink ? "#fff" : "transparent",
                    color: location.pathname === langLink ? cyan[900] : "#fff",
                    mx: location.pathname === langLink ? 1 : 0,
                    "&:hover": {
                      backgroundColor:
                        location.pathname === langLink ? "#fff" : "",
                      color: location.pathname === langLink ? cyan[900] : "",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === langLink ? cyan[900] : "#fff",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: { xs: "12px", md: "1.25rem" },
                      color:
                        location.pathname === langLink ? cyan[900] : "#fff",
                      my: { xs: 0, md: "4px" },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Button
          variant="contained"
          onClick={handleDrawerClose}
          sx={{
            width: "95%",
            mb: 2,
            mx: 2,
            backgroundColor: red[600],
            display: { xs: "block", md: "none" },
          }}
        >
          Close
        </Button>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
