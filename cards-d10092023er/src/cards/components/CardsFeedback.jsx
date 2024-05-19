import React from 'react'
import Cards from './Cards'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import { Typography } from '@mui/material';
import { useTheme } from '../../providers/CustomThemeProvider';
export default function CardsFeedback({
    isLoading,
    cards,
    error,
    handleDelete,
    handleLike,
   
}) {
  const {isDark} = useTheme()
  
    if(isLoading) return <Spinner/>;
    if(error) return <Error errorMessage={error}/>;
    if(cards && cards.length === 0){
      return (
      <Typography color={isDark ? "white" : "black"}>
      Oops... it seems there are no business cards to display
      </Typography>)
    }
    if(cards) 
    return <Cards 
        cards={cards}
        handleCardDelete={handleDelete}
        handleCardLike={handleLike}
      />;
    return null
    
}