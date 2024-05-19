import React, { useEffect} from 'react'
import PageHeader from '../../components/PageHeader'
import CardsFeedback from '../components/CardsFeedback'
import useCards from '../hooks/useCards'
import AddNewCardButton from '../components/AddNewCardButton'

export default function CardsPage() {
  const{
    filterCards,
    isLoading,
    error,
    getCardsData,
    handleDeleteCard,
    handleCardLike
  }=useCards()

  useEffect(()=>{
    getCardsData()
  },[getCardsData])

  const onDelete = async (id) => {
    await handleDeleteCard(id);
    getCardsData();
  }; 

  const onLike = async (id,isLiked) => {
    await handleCardLike(id,isLiked)
    
  }

  return (
    <div>
      <PageHeader
        title="Business Cards"
        subtitle="On this page you can find all business cards from all categories"
      />
        <CardsFeedback  
        isLoading={isLoading}
        cards={filterCards}
        error={error}
        handleDelete={onDelete}
        handleLike={onLike}/>

        <AddNewCardButton/>
   </div>
);
};
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