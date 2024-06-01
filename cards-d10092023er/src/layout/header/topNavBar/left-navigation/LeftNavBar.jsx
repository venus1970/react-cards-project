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
          <NavItem
         to={ROUTES.CONTACT_US} 
         label="Contact Us" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to Contact Us page"
         />
        
        {/*here is hidden sandbox for admin*/}
        
     {/* {user && user.isAdmin && 
       <NavItem
         to={ROUTES.SANDBOX} 
         label="Sandbox" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to Sandbox page"
         />} */}

          {user && user.isAdmin && 
       <NavItem
         to={ROUTES.CRM_PANEL} 
         label="CrmPanel" 
         sx={{color: isDark ? "white" : "black"}}
         aria-label="Navigate to AdminCrmPanel page"
         />}
        
     </Box>
    </Box>
  )
}