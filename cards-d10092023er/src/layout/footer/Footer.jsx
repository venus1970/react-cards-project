import {BottomNavigation, BottomNavigationAction, Box, Paper, Typography } from '@mui/material'
import React from 'react'
import StyleIcon from '@mui/icons-material/Style';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import ROUTES from '../../routes/routesModel';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from '../../users/providers/UserProvider';
import { useTheme } from '../../providers/CustomThemeProvider';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Footer() {
  const navigate= useNavigate()
  const {user} =useUser()
  const {isDark} = useTheme()

  return (
   <Paper sx={{position:'sticky',bottom:0,left:0,right:0,zIndex:1,
    boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.25)', 
        backgroundColor: isDark ? "light gray" : "pink", // Dark gray background color in dark mode
   }}>
      <BottomNavigation
        showLabels
        sx={{
           
          backgroundColor: isDark ? "#282828" : "#FFC0CB", // Dark gray background color in dark mode
          "& .Mui-selected": { color: isDark ? "#87CEFA" : "#FF69B4" }, // Selected color
          "& .MuiBottomNavigationAction-root": {
            "&:hover": { color: isDark ? "#FF69B4" : "#FF1493" },
          },
        }}
      >
      <BottomNavigationAction
        label="About"
        icon={<InfoIcon/>}
        onClick={()=>navigate(ROUTES.ABOUT)}
      />
      <BottomNavigationAction
        label="Cards"
        icon={<StyleIcon/>}
        onClick={()=>navigate(ROUTES.CARDS)}
      />
      {user && user.isBusiness && <BottomNavigationAction
        label="My Cards"
        icon={<RecentActorsIcon/>}
        onClick={()=>navigate(ROUTES.MY_CARDS)}
      />}
      {user && user._id && <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon/>}
        onClick={()=>navigate(ROUTES.FAV_CARDS)}
      />}
       <BottomNavigationAction
          label="Contact Us"
          icon={<ContactPhoneIcon />}
          onClick={() => navigate(ROUTES.CONTACT_US)}
        />
        {user && user.isAdmin && <BottomNavigationAction
        label="Crmpanel"
        icon={<AdminPanelSettingsIcon/>}
        onClick={()=>navigate(ROUTES.CRM_PANEL)}
        />}
        

    </BottomNavigation>
    <Box justifyContent="space-between" sx={{boxSizing:"5px",display:{xs:"none",md:"inline-flex"}}}>
    <Typography variant="body2"
        sx={{
          position: "absolute",
          left: "16px",
          bottom: "8px",
          fontSize:"12px",
          color: isDark ? 'white' : "gray",
          
          
        }}> © 2024 Tzila Aharoni's Cards Company. All rights reserved.</Typography>
    <Typography variant="body2"
        sx={{
          position: "absolute",
          right: "16px",
          bottom: "8px",
          fontSize:"12px",
          color: isDark ? 'white' : "gray",
         
        }}>Contact: tzila970@gmail.com</Typography>

    </Box>
   </Paper>
  )
}