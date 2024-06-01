import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import mapToModelUser from '../helpers/normalization/mapToModelUser';
import ROUTES from '../../routes/routesModel';
import { Box, Container, Typography, useTheme, CircularProgress } from '@mui/material';
import useUsers from '../hooks/useUsers';
import useForm from '../../forms/hooks/useForm';
import initialEditForm from '../helpers/initialForms/initialEditForm';
import EditUserForm from '../components/EditUserForm';
import editUserSchema from '../models/editUserSchema';
import PageHeader from '../../components/PageHeader';

export default function EditUserPage() {
  const { handleGetUser, handleUpdateUser } = useUsers();
  const { user } = useUser();
  const theme = useTheme();
  const [fetchError, setFetchError] = useState(null);

  const {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditForm, editUserSchema, (newUser) => handleUpdateUser(user._id, newUser));

  const userId = user && user._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await handleGetUser(userId);
        const modelUser = mapToModelUser(userData);
        setData(modelUser);
      } catch (error) {
        setFetchError(error.message);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [handleGetUser, setData, userId]);

  if (!user) return <Navigate replace to={ROUTES.LOGIN} />;

  return (
    <div>
      <Box>
        <PageHeader
          title="Edit Account"
          subtitle="Here you can edit your account"
        />
     
      <Container
          sx={{
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           <Box
            sx={{
              bgcolor:
                theme.palette.mode === "dark" ? "#000" : "#FFFFE0", // Black background color in dark mode
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginBottom: "40px", // Margin bottom added to form
              border:
                theme.palette.mode === "dark" ? "1px solid white" : "none", // White border in dark mode
            }}
          >
         <Typography
              variant="h5"
              color={theme.palette.mode === "dark" ? "white" : "initial"} // White color in dark mode
              sx={{
                textAlign: "center",
                marginBottom: 2,
                marginTop: 2,
                textTransform: "uppercase",
              }}
            >
              Edit Account
            </Typography>
        {fetchError ? (
          <Typography variant="body1" color="error">
            Error: {fetchError}
          </Typography>
        ) : data ? (
          <EditUserForm
            onSubmit={onSubmit}
            onReset={handleReset}
            errors={errors}
            validateForm={validateForm}
            onInputChange={handleChange}
            data={data}
          />
        ) : (
          <CircularProgress />
        )}
     
      </Box>
      </Container>
      </Box>
    </div>
  );
}
