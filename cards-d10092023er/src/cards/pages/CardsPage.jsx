import React, { useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import useCards from '../hooks/useCards';
import AddNewCardButton from '../components/AddNewCardButton';
import { Box, Divider, Typography } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function CardsPage() {
  const {
    filterCards,
    isLoading,
    error,
    getCardsData,
    handleDeleteCard,
    handleCardLike,
  } = useCards();

  useEffect(() => {
    getCardsData();
  }, [getCardsData]);

  const onDelete = async (id) => {
    await handleDeleteCard(id);
    getCardsData();
  };

  const onLike = async (id, isLiked) => {
    await handleCardLike(id, isLiked);
  };

  return (
    <div>
      <PageHeader
        title="Business Cards"
        subtitle="On this page you can find all business cards from all categories"
      />
      <Box
  sx={{
    backgroundColor: '#C9F8F3', 
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(14, 122, 112, 0.2)",
    padding: '20px',
    width: '70%', // Adjusted width
    margin: 'auto',
    marginBottom: 0,
    marginTop: "20px",
  }}
>
  <Typography variant="body1" gutterBottom sx={{ color: 'text.primary' }}>
    Welcome to your business cards page! 
    <br />
   The Business Cards Page is your gateway to efficiently managing your professional contacts. This page provides a centralized platform where you can create, edit, and organize all your business cards seamlessly. Whether you're networking, prospecting, or maintaining existing connections, this feature-rich page offers the tools you need to stay organized and productive.<br/>

Key Features:

Create and Edit: Easily create new business cards or modify existing ones with updated information. Customization options ensure your cards reflect your professional image accurately.

Organize and Categorize: Sort and categorize your business cards based on various criteria such as industry, client type, or geographic location. Streamline your contact database for quick and easy access.

Search and Filter: Utilize powerful search and filtering functionalities to locate specific contacts quickly. Whether you're searching by name, company, or keyword, finding the right contact is just a few clicks away.

Favorite and Prioritize: Mark important contacts as favorites to prioritize them in your list. This feature enables you to focus on key connections and ensures they remain easily accessible whenever you need them.

Dynamic Navigation: Navigate seamlessly through your business cards with an intuitive and user-friendly interface. Dynamic menu options adapt to your preferences, providing efficient access to essential features and functionalities.


  </Typography>
</Box>
         <Divider
          sx={{
            margin: "20px auto",
            width: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[...Array(3)].map((_, index) => (
            <FavoriteIcon key={index} color="error" fontSize="large" />
          ))}
        </Divider>
      {!isLoading ? (
        
        <CardsFeedback
          isLoading={isLoading}
          cards={filterCards}
          error={error}
          handleDelete={onDelete}
          handleLike={onLike}
        />
      ) : (
        <div>Loading...</div>
      )}

     

      <AddNewCardButton />
    </div>
  );
}


/*
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/AddNewCardButton";

export default function CardsPage() {
  const {
    cards,
    error,
    isLoading,
    getAllCards,
    handleCardLike,
    handleCardDelete,
  } = useCards();

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  return (
    <div>
      <PageHeader
        title="Business Cards"
        subtitle="On this page you can find all business cards from all categories"
      />
      <CardsFeedback
        cards={cards}
        handleDelete={handleCardDelete}
        handleLike={handleCardLike}
        isLoading={isLoading}
        error={error}
      />
      <AddNewCardButton />
    </div>
  );
}
*/
/*
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/AddNewCardButton";
 

export default function CardsPage() {
  const {
    cards,
    error,
    filteredCards,
    isLoading,
    getAllCards,
    handleCardLike,
    handleCardDelete,
  } = useCards();

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  return (
    <div>
      <PageHeader
        title="Cards"
        subtitle="On this page you can find all bussines cards from all categories"
      />
      <CardsFeedback
        cards={!!filteredCards.length ? filteredCards : cards}
        handleDelete={handleCardDelete}
        handleLike={handleCardLike}
        isLoading={isLoading}
        error={error}
      />
      <AddNewCardButton />
    </div>
  );
}
*/
