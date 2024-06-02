import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import { Avatar, Typography } from '@mui/material';
import { useTheme } from '../../providers/CustomThemeProvider';

export default function CardsFeedback({
    isLoading,
    cards,
    error,
    handleDelete,
    handleLike,
}) {
    const { isDark } = useTheme();
    const [showAvatar, setShowAvatar] = useState(false);
    const [delayPassed, setDelayPassed] = useState(false);

    useEffect(() => {
        // Check if cards are empty after loading
        if (!isLoading && !error) {
            // Delay the display of avatar by 10 seconds
            const timer = setTimeout(() => {
                setDelayPassed(true);
                setShowAvatar(cards && cards.length === 0);
            }, 300); // 0.3 seconds

            return () => clearTimeout(timer);
        }
    }, [isLoading, error, cards]);

    if (isLoading || !delayPassed) return <Spinner />;
    if (error) return <Error errorMessage={error} />;
    if (showAvatar) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Typography
                    sx
                    style={{ fontSize: "20px" }}
                    variant="h5"         
                    color={isDark ? "white" : "black"}>
                    Oops... it seems there are no business cards to display
                </Typography>
                 <Avatar
          src="/assets/images/ooops.png"
          alt="ooops"
          style={{
            maxWidth: "100%",
            display: "block",
            margin: "0 auto",
            border: "3px solid #ccc",
            borderRadius: "20px",
            height: "200px",
            width: "300px",
            marginTop: "30px",
            marginBottom: "30px",

                     }} />
            </div>
        );
    }

    return <Cards
        cards={cards}
        handleCardDelete={handleDelete}
        handleCardLike={handleLike}
    />;
}



