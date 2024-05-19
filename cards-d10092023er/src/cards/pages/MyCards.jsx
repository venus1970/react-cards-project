import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import AddNewCardButton from '../components/AddNewCardButton'
import useCards from '../hooks/useCards'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import CardsFeedback from '../components/CardsFeedback'

export default function MyCards() {
  const {
    filterCards,
    error,
    isLoading, 
    handleGetMyCards, 
    handleDeleteCard,
    handleCardLike}= useCards()
 

  const {user}=useUser()
  const navigate =useNavigate()

  useEffect(()=>{
    if(!user){
      navigate(ROUTES.CARDS)
    }else{
      handleGetMyCards()
    }
  },[user,navigate,handleGetMyCards])

  const handleDelete = async(id)=>{
    await handleDeleteCard(id)
    handleGetMyCards() 
  }

  return (
      <div>
        <PageHeader
          title="My Cards"
          subtitle="On this page you can find all My created Cards"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleCardLike}
        />
        <AddNewCardButton/>
      </div>
  )
}