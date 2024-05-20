import React from "react";
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
}
