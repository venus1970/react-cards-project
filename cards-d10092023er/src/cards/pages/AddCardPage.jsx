import React from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useCards from "../hooks/useCards";
import useForm from "../../forms/hooks/useForm";
import cardSchema from "../models/cardSchema";
import { Container, Box, useTheme, Typography } from "@mui/material";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import PageHeader from "../../components/PageHeader";

export default function AddCardPage() {
  const { user } = useUser();
  const { handleCreateCard } = useCards();
  const theme = useTheme();

  const { 
    data, 
    errors, 
    handleChange, 
    handleReset, 
    validateForm, 
    onSubmit 
  } = useForm(initialCardForm, cardSchema, handleCreateCard);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <div>
    <Box
    sx={{
        paddingTop: 4
    }}
    >
     <PageHeader
        title="Welcome to Create card page"
        subtitle="Here you can create card"
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
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#FFFFE0', // Black background in dark mode
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          border: theme.palette.mode === 'dark' ? '1px solid #fff' : 'none', // White border in dark mode
          marginBottom: '40px', // Added marginBottom
        }}
      >
        <Typography
          variant="h5"
          color={theme.palette.mode === 'dark' ? 'white' : 'initial'} // White color in dark mode
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: 2,
            marginTop: 2,
          }}
        >
          Add Card
        </Typography>
        <CardForm
          onSubmit={onSubmit}
          onReset={handleReset}
          errors={errors}
          validateForm={validateForm}
          onInputChange={handleChange}
          data={data}
        />
      </Box>
    </Container>
    </Box>
    </div>
  );
}
