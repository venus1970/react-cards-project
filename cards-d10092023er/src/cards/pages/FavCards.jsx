import React, { useEffect } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import AddNewCardButton from '../components/AddNewCardButton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material"

export default function FavCards() {
    const {
        filterCards,
        error,
        isLoading,
        handleGetFavCards,
        handleDeleteCard,
        handleCardLike
    } = useCards();

    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(ROUTES.CARDS);
        } else {
            handleGetFavCards();
        }
    }, [user, navigate, handleGetFavCards]);

    const handleDelete = async (id) => {
        await handleDeleteCard(id);
        await handleGetFavCards();
    };

    const handleLike = async (id) => {
        await handleCardLike(id);
        await handleGetFavCards();
    };
  const theme = useTheme();

    return (
        <div>
            <PageHeader
                title="Favorite Cards"
                subtitle="Manage your favorite cards here"
            />
          <Box
  sx={{
    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#C9F8F3', // Dark mode background color
    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit', // Dark mode text color
    borderRadius: "10px",
    boxShadow: theme.palette.mode === 'dark' ? "0px 0px 10px rgba(255, 255, 255, 0.5)" : "0px 0px 10px rgba(0, 0, 0, 0.25)", // Dark mode shadow
    border: "1px solid rgba(14, 122, 112, 0.2)",
    padding: '20px',
    width: '70%', // Adjusted width
    margin: 'auto',
    marginBottom: 0,
    marginTop: "30px",
  }}
>
  <Typography variant="body1" gutterBottom sx={{ color: 'text.primary' }}>
    Welcome to your favorite cards page! 
    <br />
    Here, you can view and manage all the cards you've marked as favorites. <br />
    Feel free to remove cards you no longer want in your favorites list (by
    clicking on the red favorite icon) or like cards you enjoy!<br/>
    The Favorite Cards Page is your personalized collection of preferred contacts. This page serves as a dedicated space where you can manage and interact with the business cards you've marked as favorites. Whether you've identified key prospects, important clients, or valuable networking connections, this feature-rich page offers convenient tools to streamline your workflow and enhance your productivity.
    <br/>

Key Features:

Centralized Favorites: Access all your favorite business cards in one centralized location. No more searching through lengthy lists or cluttered databases – simply navigate to your favorites page for quick and easy reference.

Effortless Management: Manage your favorite cards effortlessly with intuitive controls for deletion and liking. Remove cards you no longer need or interact with cards you appreciate by liking them to show your interest and appreciation.

Streamlined Interaction: Interact seamlessly with your favorite contacts directly from the page. Whether you need to reach out for networking opportunities, follow up on leads, or maintain existing relationships, this page provides the tools you need to stay connected.

Personalized Experience: Customize your favorite cards page to suit your preferences and priorities. Organize cards based on relevance, importance, or any other criteria that align with your professional goals and objectives.

Enhanced Productivity: Maximize your productivity by leveraging the efficiency and convenience offered by the favorite cards page. Spend less time searching for contacts and more time engaging with them effectively to achieve your business objectives.
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
                    cards={filterCards}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                />
                <AddNewCardButton />
           
        </div>
    );
}
