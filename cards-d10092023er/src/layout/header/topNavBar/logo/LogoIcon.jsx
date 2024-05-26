import { Avatar, IconButton, useTheme } from "@mui/material";
import React from "react";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

export default function LogoIcon() {
  const theme = useTheme();

  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <IconButton>
          <Avatar
            src="/assets/images/business-card.png"
            alt="Business card icon"
            sx={{
              width: theme.spacing(6),
              height: theme.spacing(6),
              backgroundColor: theme.palette.mode === 'dark' ? '#1976d2' : '#2196f3', // Blue color for dark and light mode
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#FFFOOO' : '##FFC0CB', // Darker shade of blue on hover for dark and light mode
              },
            }}
          />
        </IconButton>
      </NavBarLink>
    </>
  );
}
