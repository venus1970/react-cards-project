import { useCallback, useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { deleteUser, editUser, getAllUsers, getUserData, login, signup } from "../services/usersApiService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser, removeToken, setTokenInLocalStorage } from "../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useSnack } from "../../providers/SnackbarProvider";

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const setSnack = useSnack();

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

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (allUsers) {
      const sortedFilteredUsers = allUsers
        .filter((user) => user.name.first.includes(query) || user.name.last.includes(query) || String(user.email).includes(query))
        .sort((a, b) => a.name.first.localeCompare(b.name.first));

      setFilterUsers(sortedFilteredUsers);
    }
  }, [allUsers, query]);

  const handleLogin = useCallback(
    async (userLogin) => {
      setIsLoading(true);
      setError(null);
      try {
        const token = await login(userLogin);
        setTokenInLocalStorage(token);
        setUser(getUser());
        navigate(ROUTES.CARDS, { replace: true });
        window.location.reload();
      } catch (error) {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    },
    [setUser, navigate]
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
    try {
      const userData = await getUserData(userId);
      setUser(getUser());
      return userData;
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [setUser]);

  const handleUpdateUser = useCallback(
    async (userId, userFromclient) => {
      setIsLoading(true);
      try {
        const updatedIsBusiness = !filterUsers.find((user) => user._id === userId).isBusiness;
        await editUser(userId, { isBusiness: updatedIsBusiness });
        await handleGetAllUsers(); // Refresh the list of users
        setSnack("success", "User status changed successfully!");
      } catch (error) {
        setError(error.message);
        setSnack("error", "Failed to update user status");
      }
      setIsLoading(false);
    },
    [filterUsers, handleGetAllUsers, setSnack]
  );

  const handleDeleteUser = useCallback(
    async (userId) => {
      setIsLoading(true);
      try {
        await deleteUser(userId);
        setSnack("success", "The user has been successfully deleted");
        handleGetAllUsers(); // Refresh the list of users
      } catch (error) {
        setError(error.message);
        setSnack("error", "Failed to delete user");
      }
      setIsLoading(false);
    },
    [handleGetAllUsers, setSnack]
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
    refreshKey,
    allUsers,
    query,
    filterUsers,
  };
};

export default useUsers;
