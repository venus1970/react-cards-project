import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import useCards from '../hooks/useCards';
import AddNewCardButton from '../components/AddNewCardButton';
import { Box, Divider, Pagination, Typography } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material";

export default function CardsPage() {
  const {
    filterCards,
    isLoading,
    error,
    getCardsData,
    handleDeleteCard,
    handleCardLike,
  } = useCards();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

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
  
  const theme = useTheme();

  if (!filterCards) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6">Loading...</Typography>
      </div>
    );
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filterCards.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filterCards.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <PageHeader
        title="Business Cards"
        subtitle="On this page you can find all business cards from all categories"
      />
      <Box
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#C9F8F3',
          color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
          borderRadius: "10px",
          boxShadow: theme.palette.mode === 'dark' ? "0px 0px 10px rgba(255, 255, 255, 0.5)" : "0px 0px 10px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(14, 122, 112, 0.2)",
          padding: '20px',
          width: '70%',
          margin: 'auto',
          marginBottom: 0,
          marginTop: "30px",
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
      <CardsFeedback
        isLoading={isLoading}
        cards={currentUsers}
        error={error}
        handleDelete={onDelete}
        handleLike={onLike}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
       <Pagination
          position="fixed"
          size="large"
  count={totalPages}
  page={currentPage}
  onChange={handlePageChange}
  color="primary"
  sx={{
    marginTop: 8, // Adjust margin top as needed
    marginBottom: 20, // Add margin bottom
    '& .MuiPaginationItem-root': {
      borderRadius: '50%', // Make pagination buttons circular
      margin: '0 2px', // Add margin between pagination buttons
    },
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main, // Change background color of selected page
      color: theme.palette.primary.contrastText, // Change text color of selected page
      '&:hover': {
        backgroundColor: theme.palette.primary.dark, // Change hover background color of selected page
      },
    },
  }}
/>
      </Box>
      <AddNewCardButton 
      />
    </div>
  );
}
