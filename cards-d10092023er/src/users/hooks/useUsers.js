import { useCallback, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { editUser, getUserData, login, signup } from "../services/usersApiService";
import { useNavigate } from "react-router-dom";
import { getUser, removeToken, setTokenInLocalStorage } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";

const useUsers = () => {
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, setUser, setToken } = useUser();
    const setSnack = useSnack()
  
    const handleLogin = useCallback(
      async (userLogin) => {
        setIsLoading(true);
        try {
          const token = await login(userLogin);
          setTokenInLocalStorage(token);
          setToken(token);
          setUser(getUser());
          navigate(ROUTES.CARDS)
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      },
      [setToken, setUser, navigate]
    );
  
    const handleLogout = useCallback(() => {
      removeToken();
      setUser(null);
    }, [setUser]);
  
    const handleSignup = useCallback(
      async (userFromClient) => {
        setIsLoading(true);
        try {
          const normalizedUser = normalizeUser(userFromClient);
          await signup(normalizedUser);
          await handleLogin({
            email: userFromClient.email,
            password: userFromClient.password,
          });
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      },
      [handleLogin]
    );

    

    const handleGetUser = useCallback(async (userId) => {
          setIsLoading(true);
          try{
            const userData = await getUserData(userId);
            setUser(getUser());
            return userData
          } catch(error){
            setError(error)
          }
          setIsLoading(false)
      }, [setUser]);

    const handleUpdateUser = useCallback(
        async (userId,userFromclient) => {
          setIsLoading(true);
          try {
            const userUpdate = await editUser(userId, normalizeEditUser(userFromclient));
            setUser(userUpdate)
            setSnack("success", "The user has been successfully updated");
            setTimeout(() => {
              navigate(ROUTES.USER_PROFILE); 
            }, 1000);
          } catch (error) {
            setError(error.message);
          }
          setIsLoading(false);
        },
        [setUser,setSnack, navigate]
      );
    

    
  
    return { 
      user, 
      isLoading, 
      error, 
      handleLogin, 
      handleLogout, 
      handleSignup,
      handleGetUser,
      handleUpdateUser,
       };
  };
  
  export default useUsers;