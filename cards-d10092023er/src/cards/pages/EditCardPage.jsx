import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useCards from "../hooks/useCards";
import { useUser } from "../../users/providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/cardSchema";
import CardForm from "../components/CardForm";
import mapCardToModel from "../helpers/normalization/mapCardToModel";
import PageHeader from "../../components/PageHeader";

export default function EditCardPage() {
  const { id } = useParams();
  const { handleUpdateCard, getCardByIdEdit, card } = useCards();
  const { user } = useUser();
  const theme = useTheme();

  const {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialCardForm, cardSchema, (newCard) =>
    handleUpdateCard(card._id, newCard)
  );

  useEffect(() => {
    getCardByIdEdit(id).then((data) => {
      const modelCard = mapCardToModel(data);
      setData(modelCard);
    });
  }, [getCardByIdEdit, setData, id]);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <div>
      <Box>
        <PageHeader
          title="Edit Card"
          subtitle="Here you can edit your card"
        />
       <Container
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 4,
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: 4,
    },
    marginBottom: "100px", // Margin bottom added to form
    marginTop: "20px", // Add margin above the form
     
  }}
>
          <Box
  sx={{
    bgcolor:
      theme.palette.mode === "dark" ? "#000" : "#FFFFE0", // Black background color in dark mode
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
   
    border:
      theme.palette.mode === "dark" ? "1px solid white" : "none", // White border in dark mode
    marginTop: "20px", // Add margin above the form
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
              Edit Card
            </Typography>
            {data && (
              <CardForm
                onSubmit={onSubmit}
                onReset={handleReset}
                errors={errors}
                validateForm={validateForm}
                onInputChange={handleChange}
                data={data}
              />
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
}
