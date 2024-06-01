import { Box, Divider, Typography, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import AddNewCardButton from '../components/AddNewCardButton';
import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import CardsFeedback from '../components/CardsFeedback';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material";

export default function MyCards() {
  const {
    filterCards,
    error,
    isLoading, 
    handleGetMyCards, 
    handleDeleteCard,
    handleCardLike
  } = useCards();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.CARDS);
    } else {
      handleGetMyCards();
    }
  }, [user, navigate, handleGetMyCards]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetMyCards(); 
  };

  if (!filterCards) {
    return null; // Or you can render a loading indicator here
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
        title="My Cards"
        subtitle="On this page you can find all the cards you've created."
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
          Welcome to your personal cards page! <br />
          Here, you can view and manage all the cards you've created. <br />
          Feel free to edit, delete cards you no longer need or like cards you enjoy!
          <br />
          The "My Cards Page" is your personal hub for managing all your
          business cards efficiently. Whether you're a seasoned professional or
          just starting out, this page offers a streamlined approach to
          organizing and accessing your vital contact information.
          <br />
          Key Features:

          Card Management: Seamlessly create, edit, and delete your business cards to keep your contact database up-to-date.

          Customization: Tailor your cards with personalized details such as company information, contact details, and profile pictures.

          Favorite Cards: Mark specific cards as favorites for quick access and prioritization.

          Dynamic Navigation: Navigate effortlessly through your card collection with an intuitive and user-friendly interface.

          Accessibility: Our platform prioritizes accessibility, ensuring that all users, regardless of ability, can utilize and benefit from its features.
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
        error={error}
        cards={currentUsers}
        handleDelete={handleDelete}
        handleLike={handleCardLike}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            marginTop: 8, // Adjust margin top as needed
            marginBottom: 10, // Add margin bottom
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
      
      <AddNewCardButton />
    </div>
  );
}
