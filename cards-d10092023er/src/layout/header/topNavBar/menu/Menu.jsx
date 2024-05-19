import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useUser } from "../../../../users/providers/UserProvider";
import useUsers from "../../../../users/hooks/useUsers";
import ROUTES from "../../../../routes/routesModel";
import MenuLink from "../../../../routes/components/MenuLink";
import { useTheme } from "../../../../providers/CustomThemeProvider";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchBar from "../right-navigation/SearchBar";


const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useUsers();
  const {isDark,toggleDarkMode} =useTheme()

  const onLogout = () => {
    handleLogout();
    onClose();
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>

      <Box>
      
        <Box sx={{ m: 1 ,display: {md:"none"}}}>
          <SearchBar/>
        </Box>
        
       {user && <MenuLink
          text="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", sm: "none" }}}
        />}
        
        {!user && (
          <Box>
         
            <MenuLink
              text="login"
              navigateTo={ROUTES.LOGIN}
              onClick={onClose}
              styles={{display: { xs: "block", md: "none" } }}
              
            />
            <MenuLink
              text="signup"
              navigateTo={ROUTES.SIGNUP}
              onClick={onClose}
              styles={{ display: { xs: "block", md: "none" } }}
            />
          </Box>
        )}
        {user && (
          <Box>
            <MenuLink
              text="profile"
              navigateTo={ROUTES.USER_PROFILE}
              onClick={onClose}
            />
            <MenuLink
              text="edit account"
              navigateTo={ROUTES.EDIT_USER}
              onClick={onClose} 
            />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Box>
        )}
        <IconButton  
          onClick={toggleDarkMode} 
          sx={{display: {xs:"inline-flex" ,md:"none"},ml:1}}>
         {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </MuiMenu>
  );
};

export default Menu;