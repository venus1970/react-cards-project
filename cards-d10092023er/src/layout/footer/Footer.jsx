import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.mode === "dark" ? "#90EE90" : "#FFD900", // Light green in dark mode, pink in light mode
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#90EE90" : "#FFC0CB", // Light green in dark mode, pink in light mode
          "& .Mui-selected": {
            color: theme.palette.mode === "dark" ? "#87CEFA" : "#FF69B4", // Light blue in dark mode, hot pink in light mode for selected item
          },
          "& .MuiBottomNavigationAction-root": {
            "&:hover": {
              color: theme.palette.mode === "dark" ? "#FF69B4" : "#FF1493", // Light blue in dark mode, hot pink in light mode on hover
            },
          },
        }}
      >
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        <BottomNavigationAction
          label="Fav cards"
          icon={<FavoriteIcon />}
          onClick={() => navigate(ROUTES.FAV_CARDS)}
        />
        <BottomNavigationAction
          label="Cards"
          icon={<StyleIcon />}
          onClick={() => navigate(ROUTES.CARDS)}
        />
      </BottomNavigation>
    </Paper>
  );
}
