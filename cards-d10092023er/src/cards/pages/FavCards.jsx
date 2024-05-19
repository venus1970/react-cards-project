import React, { useEffect } from 'react'
import useCards from '../hooks/useCards'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import PageHeader from '../../components/PageHeader'
import CardsFeedback from '../components/CardsFeedback'
import AddNewCardButton from '../components/AddNewCardButton'

export default function FavCards() {
    const {
        filterCards,
        error,
        isLoading,
        handleGetFavCards,
        handleDeleteCard,
        handleCardLike
      } = useCards()

        const {user} = useUser()
        const navigate = useNavigate()
        

        useEffect(()=>{
            if(!user){
              navigate(ROUTES.CARDS)
            }else{
              handleGetFavCards()
            }
          },[user,navigate,handleGetFavCards])
        
        const handleDelete = async(id)=>{
            await handleDeleteCard(id);
            await handleGetFavCards();
        };
        const handleLike = async (id) => {
            await handleCardLike(id);
            await handleGetFavCards();
          };
  return (
    <div >
        <PageHeader
          title="Favorite Cards"
          subtitle="On this page you can find all my favorite cards from all categories"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
        <AddNewCardButton/>
      </div>
  );
};