import { useCallback, useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { deleteUser, editUser,changeStatusUser, getAllUsers, getUserData, login, signup } from "../services/usersApiService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser, removeToken, setTokenInLocalStorage } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import useAxios from "../../hooks/useAxios";

const useUsers = () => {
    const [isLoading, setIsLoading] = useState();
    const [refreshKey, setRefreshKey] = useState(0);
    const [error, setError] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [searchParams] =useSearchParams()
    const navigate = useNavigate();
    const { user, setUser, setToken } = useUser();
    const setSnack = useSnack()
    useAxios();
    useEffect(() => {
      setQuery(searchParams.get("q") ?? "");
  }, [searchParams]); 
 
useEffect(() => {
    if (allUsers) {
      const sortedFilteredUsers = allUsers
        .filter(
          (user) =>
            user.name.first.includes(query) ||
            user.name.last.includes(query) ||
            String(user.email).includes(query))
        .sort((a, b) => a.name.first.localeCompare(b.name.first));

      setFilterUsers(sortedFilteredUsers);
    }
  }, [allUsers, query]);

    const handleLogin = useCallback(
      async (userLogin) => {
        setIsLoading(true);
        setError(null)
        try {
          const token = await login(userLogin);
          setTokenInLocalStorage(token);
          setToken(token);
          setUser(getUser());
          navigate(ROUTES.CARDS, {replace:true})
          

        } catch (error) {
          setError("Invalid email or password");
        }
        setIsLoading(false);
      },
      [setToken, setUser, navigate]);
  
    const handleLogout = useCallback(() => {
      removeToken();
      setUser(null);
      navigate(ROUTES.LOGIN, {replace:true})
      }, [setUser,navigate]);
  
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
      [handleLogin]);

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
        [setUser,setSnack, navigate]);

     const handleChangeStatus = useCallback(
        async (userId) => {
            setIsLoading(true);
            try {
                const userData = await getUserData(userId);
                const updatedUser = {
                    ...userData,
                    isBusiness: !userData.isBusiness,
                };
                const userUpdate = await changeStatusUser(userId, updatedUser);
                setAllUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === userId ? userUpdate : user))
                );
                if (userId === user._id) {
                    // Only update the current user without logging out
                    setUser((prevUser) => ({
                        ...prevUser,
                        isBusiness: !prevUser.isBusiness,
                    }));
                }
                setSnack("success", "User status changed successfully!");
            } catch (error) {
                setError(error.message);
                setSnack("error", "Failed to update user status.");
            }
            setIsLoading(false);
        },
    [setSnack, setUser, user]
    );

    const handleGetAllUsers = useCallback(async () => {
        setIsLoading(true);
        try {
          const users = await getAllUsers();
          setAllUsers(users);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }, []);

      const handleDeleteUser = useCallback(
        async (userId) => {
            setIsLoading(true);
            try {
              await deleteUser(userId);
              setSnack("success", "The user has been successfully deleted");
              handleGetAllUsers(); 
            } catch (error) {
                setError(error.message);
                setSnack("error", "Failed to delete user");
            }
            setIsLoading(false);
        },[handleGetAllUsers,setSnack]
      );
      const handleRefresh = useCallback(() => {
        handleGetAllUsers();
        setRefreshKey((prevKey) => prevKey + 1);
      }, [handleGetAllUsers]);
      
      return { 
      user, 
      isLoading, 
      error, 
      handleLogin, 
      handleLogout, 
      handleSignup,
      handleGetUser,
      handleUpdateUser,
      handleDeleteUser,
      handleGetAllUsers,
      handleRefresh,
      handleChangeStatus,
      refreshKey,
      allUsers,  
      query,
      filterUsers
       };
  };
  
  export default useUsers;
