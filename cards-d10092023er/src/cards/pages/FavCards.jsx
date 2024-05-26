import React, { useEffect } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';
import AddNewCardButton from '../components/AddNewCardButton';

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

    return (
        <div>
            <PageHeader
                title="Favorite Cards"
                subtitle="Manage your favorite cards here"
            />
            <Box sx={{ textAlign: 'center', minHeight: '90vh', m: 1, display: { xs: "none", md: "block" } }}>
                <Typography variant="body1" gutterBottom>
                    Welcome to your favorite cards page! <br />
                    Here, you can view and manage all the cards you've marked as favorites. <br />
                    Feel free to remove cards you no longer want in your favorites list or like cards you enjoy!
                </Typography>
                 <Divider sx={{  color: 'blue' ,my: 2 }} />
                <CardsFeedback
                    isLoading={isLoading}
                    error={error}
                    cards={filterCards}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                />
                <AddNewCardButton />
            </Box>
        </div>
    );
}
