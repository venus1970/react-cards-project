/*import React from "react";
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
*/
import { Box } from '@mui/material'
import React from 'react'
import LogoIcon from '../logo/LogoIcon'
import Logo from '../logo/Logo'
import NavItem from '../../../../routes/components/NavItem'
import ROUTES from '../../../../routes/routesModel'
import { useTheme } from '../../../../providers/CustomThemeProvider'
import { useUser } from '../../../../users/providers/UserProvider'

export default function LeftNavBar() {
  const {isDark}=useTheme()
  const {user}= useUser()
  
  return (
   <Box sx={{display:"flex", alignItems:"center"}}>
     <LogoIcon/>
     <Logo/>


       <Box sx={{display:{xs:"none", sm:"flex"}}}>
         <NavItem 
           to={ROUTES.ABOUT} 
           label='About' 
           sx={{color: isDark ? "white" : "black"}}
           aria-label="Navigate to About page"
           />

     <Box sx={{display:{xs:"none",sm:"inline-flex"}}}>
     <NavItem 
       to={ROUTES.CARDS} 
       label='Cards'
       sx={{color: isDark ? "white" : "black"}}
       aria-label="Navigate to Cards page"
       />

     
     </Box>
     {user && user.isBusiness && 
       <NavItem 
         to={ROUTES.MY_CARDS} 
         label="My Cards" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to My Cards page"
         />}

     {user &&  
       <NavItem
         to={ROUTES.FAV_CARDS} 
         label="Fav Cards" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to Fav Cards page"
         />}

     {user && user.isAdmin && 
       <NavItem
         to={ROUTES.SANDBOX} 
         label="Sandbox" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to Sandbox page"
         />}

          {user && user.isAdmin && 
       <NavItem
         to={ROUTES.ADMIN_CRM_PANEL} 
         label="AdminCrmPanel" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to AdminCrmPanel page"
         />}
     </Box>
    </Box>
  )
}