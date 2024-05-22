import React from "react";
import NavBarLink from "./NavBarLink";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../../providers/CustomThemeProvider";
import { makeFirstLetterCapital } from "../../forms/utils/algoMethods";

const MenuLink = ({ text, navigateTo, styles }) => {
  const { isDark } = useTheme();
  return (
    <NavBarLink to={navigateTo}>
      <MenuItem sx={{ ...styles, color: isDark ? "white" : "black" }}>
        {makeFirstLetterCapital(text)}
      </MenuItem>
    </NavBarLink>
  );
};

export default MenuLink;
