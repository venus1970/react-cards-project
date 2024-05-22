import React from "react";
import { Typography, useTheme } from "@mui/material";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

export default function Logo() {
  const theme = useTheme();

  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <Typography
          variant="h4"
          sx={{
            marginRight: 2,
            marginBottom: 2,
            fontFamily: "fantasy",
            fontWeight:600,
        fontSize:{xs:"25px",md:"36px"},
        mt:1.5,
        ml:1,
        mr:2,
            display: { xs: "none", md: "inline-flex" },
            color: theme.palette.mode === "dark" ? "primary.light" : "primary.dark",
          }}
        >
          BCard
        </Typography>
      </NavBarLink>
    </>
  );
}
