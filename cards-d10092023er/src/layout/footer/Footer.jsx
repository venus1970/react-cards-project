
/*import React from "react";
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
*/

import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, Typography, useTheme } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StyleIcon from "@mui/icons-material/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useUser } from '../../users/providers/UserProvider';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export default function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useUser();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.mode === "dark" ? "#90EE90" : "#FFC0CB",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "8px 16px",
        display: "relative",
      }}
    >
      {/* Typography for left side */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: "16px",
          bottom: "8px",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
           "&:hover": {
            color: theme.palette.mode === "dark" ? "#FF69B4" : "#FF1493", // Hover pink effect
          },
        }}
      >
        © 2024 Tzila Aharoni's Cards Company. All rights reserved.
      </Typography>
      
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#90EE90" : "#FFC0CB",
          "& .Mui-selected": {
            color: theme.palette.mode === "dark" ? "#87CEFA" : "#FF69B4",
          },
          "& .MuiBottomNavigationAction-root": {
            "&:hover": {
              color: theme.palette.mode === "dark" ? "#FF69B4" : "#FF1493",
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
          label="Cards"
          icon={<StyleIcon />}
          onClick={() => navigate(ROUTES.CARDS)}
        />
        {user && user.isBusiness && <BottomNavigationAction
          label="My Cards"
          icon={<RecentActorsIcon/>}
          onClick={()=>navigate(ROUTES.MY_CARDS)}
        />}
        {user && user._id && <BottomNavigationAction        
          label="Fav Cards"
          icon={<FavoriteIcon />}
          onClick={() => navigate(ROUTES.FAV_CARDS)}
        />}  
        <BottomNavigationAction
          label="Contact Us"
          icon={<ContactPhoneIcon />}
          onClick={() => navigate(ROUTES.CONTACT_US)}
        />     
      </BottomNavigation>
      
      {/* Typography for right side */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          right: "16px",
          bottom: "8px",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
           "&:hover": {
            color: theme.palette.mode === "dark" ? "#FF69B4" : "#FF1493", // Hover pink effect
          },
        }}
      >
        Contact: tzila970@gmail.com
      </Typography>
    </Paper>
  );
}
