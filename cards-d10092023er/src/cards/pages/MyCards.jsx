/*import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import AddNewCardButton from '../components/AddNewCardButton'
import useCards from '../hooks/useCards'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import CardsFeedback from '../components/CardsFeedback'
import { Box, Divider, Typography } from '@mui/material'

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
                subtitle="Manage your cards here"
            />
        <Box sx={{ textAlign: 'center', minHeight: '90vh', m: 1, display: { xs: "none", md: "block" } }}>
                <Typography variant="body1" gutterBottom>
                    Welcome to your personal cards page! <br />
                    Here, you can view and manage all the cards you've created. <br />
                    Feel free to edit, delete cards you no longer need or like cards you enjoy!
                </Typography>
                 <Divider sx={{  color: 'blue' ,my: 2 }} />



        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleCardLike}
        />
        <AddNewCardButton/>
        </Box>
      </div>
  )
}*/
import { Box, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import AddNewCardButton from '../components/AddNewCardButton'
import useCards from '../hooks/useCards'
import { useUser } from '../../users/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'
import CardsFeedback from '../components/CardsFeedback'
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <div>
      
        <PageHeader
          title="My Cards"
        subtitle="On this page you can find all the cards you've created."
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
      Welcome to your personal cards page! <br />
                    Here, you can view and manage all the cards you've created. <br />
                    Feel free to edit, delete cards you no longer need or like cards you enjoy!
                  <br/>
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
          cards={filterCards}
          handleDelete={handleDelete}
          handleLike={handleCardLike}
        />
        <AddNewCardButton/>
     
      </div>
  )
}