import React from 'react';
import Cards from './Cards';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import { Typography } from '@mui/material';
import { useTheme } from '../../providers/CustomThemeProvider';

export default function CardsFeedback({
    isLoading,
    cards,
    error,
    handleDelete,
    handleLike,
}) {
    const { isDark } = useTheme();

    if (isLoading) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    // if (cards && cards.lenth === 0) {
    if (!cards || cards.length === 0) {
        return (
            <div style={{ textAlign: 'center' }}>
        <Typography
          sx
          style={{ fontSize: "20px" }}
          variant="h5"
          color={isDark ? "white" : "black"}>
                    Oops... it seems there are no business cards to display
                </Typography>
                {/*<img src="/assets/images/ooops.png" alt="ooops" style={{ maxWidth: '100%', display: 'block', margin: '0 auto', border: '3px solid #ccc', borderRadius: '20px' }} />*/}
            </div>
        );
    }
    
    return <Cards
        cards={cards}
        handleCardDelete={handleDelete}
        handleCardLike={handleLike}
    />;
}
