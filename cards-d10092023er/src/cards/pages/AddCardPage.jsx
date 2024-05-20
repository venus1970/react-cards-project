import React from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useCards from "../hooks/useCards";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/cardSchema";
import { Box, useTheme } from "@mui/material"; // Add import for useTheme
import CardForm from "../components/CardForm";

export default function AddCardPage() {
  const { user } = useUser();
  const { handleCreateCard } = useCards();
  const theme = useTheme(); // Use useTheme hook to access theme

  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialCardForm, cardSchema, handleCreateCard);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
<div>
    <Box
      sx={{
        minHeight: "90vh",
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#FFFFE0',
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
        border: theme.palette.mode === 'dark' ? '1px solid #ffffff' : '1px solid #000000', // White border in light mode, black border in dark mode
        '@media (max-width: 600px)': {
          padding: '10px',
        },
      }}
    >
      <CardForm
        title="add card"
        onSubmit={onSubmit}
        onReset={handleReset}
        errors={errors}
        validateForm={validateForm}
        onInputChange={handleChange}
        data={data}
      />
    </Box>
    </div>
  );
}