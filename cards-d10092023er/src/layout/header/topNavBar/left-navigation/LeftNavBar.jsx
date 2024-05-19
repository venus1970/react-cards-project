import React from "react";
import { Box } from "@mui/material";
import LogoIcon from "../logo/LogoIcon";
import Logo from "../logo/Logo";
import NavItem from "../../../../routes/components/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";




export default function LeftNavBar() {
  const { user } = useUser();
  

  return (
    <Box>
      <LogoIcon />
      <Logo />
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
    
      <NavItem label="About" to={ROUTES.ABOUT} />
      {user && user.isBusiness && (
        <>
      <NavItem label="Business Cards" to={ROUTES.CARDS} />
      <NavItem label="Fav Cards" to={ROUTES.FAV_CARDS} />
      <NavItem label="My Cards" to={ROUTES.MY_CARDS} />
     </>
     )}
     {user && user.isAdmin && <NavItem label="sandbox" to="/sandbox" />}
    
     </Box>
    </Box>
  );
};