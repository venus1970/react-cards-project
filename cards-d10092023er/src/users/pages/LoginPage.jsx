/*import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/loginSchema";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import Form from "../../forms/components/Form";
import ROUTES from "../../routes/routesModel";
import Input from "../../forms/components/Input";
import { useUser } from "../providers/UserProvider";
import { Navigate, Link } from "react-router-dom";
import { Box, Button, Grid, useTheme } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from "../hooks/useUsers";

export default function LoginPage() {
  const { handleLogin } = useUsers();
  const theme = useTheme();

  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);

  const { user } = useUser();

  if (user) return <Navigate to={ROUTES.ROOT} />;

  return (
    <Box
      sx={{
        minHeight: '90vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f0f0f0',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        paddingTop: 4,
      }}
    >
      <PageHeader
        title="Welcome to Login page"
        subtitle="Here you can login"
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
            backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#FFFFE0', // Light yellow in light mode
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
             border: theme.palette.mode === 'dark' ? '1px solid #ffffff' : '1px solid #000000', // White border in light mode, black border in dark mode
          }}
        >
        <Form
          title="login form"
          styles={{ maxWidth: "450px" }}
          to={ROUTES.ROOT}
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
        >
          <Input
            label="email"
            name="email"
            type="email"
            error={errors.email}
            onChange={handleChange}
            data={data}
          />
          <Input
            label="password"
            name="password"
            type="password"
            error={errors.password}
            onChange={handleChange}
            data={data}
          />
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component={Link}
              to={ROUTES.SIGNUP}
              startIcon={<AccountBoxIcon />}
              sx={{ width: "100%" }}
            >
              Sign Up
            </Button>
          </Grid>
        </Form>
        </Box>
      </Container>
    </Box>
  );
}*/
import React, { useState, useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/loginSchema";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import Form from "../../forms/components/Form";
import ROUTES from "../../routes/routesModel";
import Input from "../../forms/components/Input";
import { useUser } from "../providers/UserProvider";
import { Navigate, Link } from "react-router-dom";
import { Box, Button, Grid, useTheme, Snackbar, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from "../hooks/useUsers";
import MuiAlert from '@mui/material/Alert';
import { useSnack } from "../../providers/SnackbarProvider";

export default function LoginPage() {
  const { handleLogin } = useUsers();
  const theme = useTheme();
  const [alertOpen, setAlertOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);
  const { user } = useUser();
  const setSnack = useSnack();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    if (failedAttempts >= 3) {
      setBlocked(true);
      setSnack(
        "error",
        "You have exceeded the maximum number of login attempts. Please try again later: after 5 minutes you will be able to log in again!"
      );
      const blockTimer = setTimeout(() => {
        setFailedAttempts(0);
        setBlocked(false);
      }, 5 * 60 * 1000); // 5 minutes
      return () => clearTimeout(blockTimer);
    }
  }, [failedAttempts, setSnack]);

  if (user) return <Navigate to={ROUTES.ROOT} />;

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f0f0f0",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        paddingTop: 4,
      }}
    >
      <PageHeader title="Welcome to Login page" subtitle="Here you can login" />
      <Typography
        variant="body1"
        sx={{
          color: "blue",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        *For security reasons, you have 3 consecutive failed login attempts. If your account will be temporarily blocking, please wait for the 5 minutes before attempting to log in again.
      </Typography>
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
            backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#FFFFE0",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            border: theme.palette.mode === "dark" ? "1px solid #ffffff" : "1px solid #000000",
            marginBottom: "30px",
            width: "100%",
            maxWidth: "450px",
            opacity: blocked ? 0.5 : 1, // Reduce opacity if blocked
            pointerEvents: blocked ? "none" : "auto", // Disable pointer events if blocked
          }}
        >
          <Form
            title="login form"
            onSubmit={(e) => {
              if (!blocked) {
                setFailedAttempts(failedAttempts + 1);
                onSubmit(e);
              }
            }}
            onReset={handleReset}
            validateForm={validateForm}
          >
            <Input
              label="email"
              name="email"
              type="email"
              error={errors.email}
              onChange={handleChange}
              data={data}
            />
            <Input
              label="password"
              name="password"
              type="password"
              error={errors.password}
              onChange={handleChange}
              data={data}
            />
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component={Link}
                to={ROUTES.SIGNUP}
                startIcon={<AccountBoxIcon />}
                sx={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </Grid>
          </Form>
        </Box>
      </Container>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
          You have been blocked due to too many failed login attempts. Please try again later.
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
