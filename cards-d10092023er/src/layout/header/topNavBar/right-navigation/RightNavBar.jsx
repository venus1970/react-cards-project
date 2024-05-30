import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useUser } from "../../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useTheme } from "../../../../providers/CustomThemeProvider";
import MoreButton from "./MoreButton";
import SearchBar from "./SearchBar";
import AccessibleIcon from "@mui/icons-material/Accessible";


export default function RightNavBar() {
  const { user } = useUser();
  const { isDark, toggleDarkMode } = useTheme();
  return (
    <>
      <SearchBar/>
      <Box
        sx={{
          display: { xs: "none", md: "inline-flex" },
          alignItems: "center",
        }}
      >
        <AccessibleIcon
          color={isDark ? "white" : "primary"}
          fontSize="large" 
        />
        <IconButton
          sx={{
            ml: 1,
            borderRadius: "10%",
            backgroundColor: isDark ? "#111" : "#fff",
            border: "1px solid blue",
            width: "30px",
            height: "30px",
            display: "flex",
            marginRight: "10px",
            marginLeft: "13px",
          }}
          onClick={toggleDarkMode}
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {user ? <Logged /> : <NotLogged />}
      </Box>
      <MoreButton />
    </>
  );
}
