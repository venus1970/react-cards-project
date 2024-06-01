import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material"; // Import useMediaQuery hook
import RightNavBar from "./right-navigation/RightNavBar";
import { MenuProvider } from "./menu/MenuProvider";

export default function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen size is small (mobile)

  return (
    <MenuProvider>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={10}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#90EE90" : "#FFC0CB", // Light green in dark mode, pink in light mode
          transition: "background-color 0.3s", // Smooth transition
          "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "#00BFFF" : "#FF69B4", // Lighter blue in dark mode, lighter pink in light mode
          },
        }}
      >
        <Toolbar sx={{ justifyContent: isMobile ? "center" : "space-between" }}> {/* Center the content on small screens */}
          {!isMobile && <LeftNavBar />} {/* Display LeftNavBar only on larger screens */}
          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
}

