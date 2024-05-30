import { Avatar, Box, Container,Paper,Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import useCards from '../hooks/useCards'
import { useParams } from "react-router-dom";
import Map from './Map';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '../../providers/CustomThemeProvider';
export default function CardDetailsPage() {
  const{getCardById,card,isLoading,error}=useCards()
  const{id}=useParams()
  const {isDark} =useTheme()
 
  useEffect(()=>{
    getCardById(id)
  },[getCardById,id])

  if (isLoading) return <Spinner/>
  if(error) return <Error errorMessage={error}/>

  return (
    <Container>
        <PageHeader
        title='Card Details Page'
        subtitle='Here you can find all the details about specific card '
        />
        <Box 
         sx={{
          ml:4,
          display: "flex",
          flexDirection:{xs:"column",md:"initial"},
          justifyContent: "space-between",
          color: isDark ? "white" : "black"
          
          }}>
           <Box 
             display='flex'
             sx={{
             alignItems:'start',  
             flexDirection:'column',
             width:{xs:"100%",md:'50%'}}}>
              <Typography fontSize={20}><strong>Card Details:</strong></Typography>
              <Avatar 
                sx={{borderRadius:1 ,width:'90%',height:300,mt:2 ,  border: 1,
              borderColor: 'white'}}
                src={card.image?.url}
                alt={card.image?.alt}
              />  
              <Paper elevation={5} sx={{mt:2,p:2,mb:2,width:"85%", border: 1,
              borderColor: 'white'}}>       
                <Typography mt={1}><strong>Title:</strong> {card.title} </Typography>
                <Typography mt={1}><strong>Subtitle:</strong> {card.subtitle} </Typography>
                <Typography mt={1}><strong>BizNumber:</strong> {card.bizNumber} </Typography>
                <Typography mt={1}><strong>Description:</strong> {card.description} </Typography>
                <Typography mt={1}><strong>Email:</strong> {card.email}</Typography>
                <Typography mt={1}><strong>Phone: </strong> {card.phone} </Typography>
                <Typography mt={1}><strong>User Id:</strong> {card.user_id} </Typography>
                <Typography mt={1}><strong>CreateAT:</strong> {card.createdAt} </Typography>
                <Typography mt={1} mb={2} sx={{border:1,borderRadius:2,p:1,width:50}}>{card.likes.length} <FavoriteIcon color='error'/></Typography>
              </Paper>  
          </Box>


          <Box 
            sx={{ 
            width: {xs:"100%",md:"50%"},
            height:{xs:"100%",md:"400px"},
            }}>
              <Typography mb={2} textAlign='start' fontSize={20}><strong>Address Card:</strong></Typography>
              <Box  
              sx={{ 
                width: {xs:"90%",md:"90%"},
                height:{xs:"200px",md:"90%"},
              }}>
             <Map 
               center={[51.505, -0.09]}
               zoom={13}
               address={card.address?.city +" "+ card.address?.street +" "+ card.address?.houseNumber}
              />
              </Box>
          <Paper
            elevation={5}
            sx={{
              mt: 2,
              p: 2,
              mb: 2,
              textAlign: "start",
              width: "85%",
              border: 1,
              borderColor: 'white'
            }} >
              <Typography mt={1}><strong>Country:</strong> {card.address?.country} </Typography>
              <Typography mt={1}><strong>City:</strong> {card.address?.city} </Typography>
              <Typography mt={1}><strong>Street:</strong> {card.address?.street} </Typography>
              <Typography mt={1}><strong>House Number:</strong> {card.address?.houseNumber} </Typography>
              </Paper>
          </Box>
        </Box>
    </Container>
  );
}



/*import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const OneCardData = ({ cardData }) => {
  const { street, city, state, country, zip } = cardData.address;

  return (
    <div style={{ display: "flex" }}>
      <Box sx={{ marginRight: "20px" }}>
        <Typography variant="h4" style={{ color: "red", marginBottom: "10px" }}>
          Card Description:
        </Typography>
        <Avatar src={cardData.image.url} alt={cardData.image.alt} sx={{ width: 400, height: 300, border: "solid blue 3px", borderRadius: "20px" }} />
        <Typography variant="body1">Title: {cardData.title}</Typography>
        <Typography variant="body1">Subtitle: {cardData.subtitle}</Typography>
      </Box>
      <Box sx={{ width: "300px", marginTop: "20px", backgroundColor: "lightblue", padding: "20px", borderRadius: "10px" }}>
        <Typography variant="h6">Additional Information:</Typography>
        <Typography variant="body1">Description: {cardData.description}</Typography>
        <Typography variant="body1">Card Number: {cardData.bizNumber}</Typography>
        <Typography variant="body1">Card ID: {cardData._id}</Typography>
        <Typography variant="body1">Phone: {cardData.phone}</Typography>
        <Typography variant="body1">Email: {cardData.email}</Typography>
        <Typography variant="body1">Website: {cardData.web}</Typography>
        <Typography variant="body1">Address:</Typography>
        <ul>
          <li>Street: {street}</li>
          <li>City: {city}</li>
          <li>State: {state}</li>
          <li>Country: {country}</li>
          <li>Zip: {zip}</li>
        </ul>
      </Box>
    </div>
  );
};

export default function CardDetailsPage() {
  const { id } = useParams();
  const { card, error, isLoading, getCardById } = useCards();

  useEffect(() => {
    getCardById(id);
  }, [id, getCardById]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  
  return (
    <Container>
      <PageHeader title="Card details" subtitle="Here you can find all the details about specific card" />
      <OneCardData cardData={card} />
    </Container>
  );
}
*/

/*
import React from 'react';
import { Typography, Avatar } from '@mui/material';

const OneCardData = ({ cardData }) => {
  const { street, city, state, country, zip } = cardData.address;

  return (
    <div>
      <Typography variant="h4" style={{ color: 'red', marginBottom: '10px' }}>Card Description:</Typography>
      <Avatar src={cardData.image.url} alt={cardData.image.alt} sx={{ width: 200, height: 200, border: 'solid blue 3px', borderRadius: '20px' }} />
      <p>Title: {cardData.title}</p>
      <p>Subtitle: {cardData.subtitle}</p>
      <p>Description: {cardData.description}</p>
      <p>Card Number: {cardData.bizNumber}</p>
      <p>Card ID: {cardData._id}</p>
      <p>Phone: {cardData.phone}</p>
      <p>Email: {cardData.email}</p>
      <p>Website: {cardData.web}</p>
      <p>Address:</p>
      <ul>
        <li>Street: {street}</li>
        <li>City: {city}</li>
        <li>State: {state}</li>
        <li>Country: {country}</li>
        <li>Zip: {zip}</li>
      </ul>
     
    </div>
  );
};

export default OneCardData;




/*
import { Avatar, Box, Container,Paper,Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import useCards from '../hooks/useCards'
import { useParams } from "react-router-dom";
import Map from './Map';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '../../providers/CustumThemeProvider';

export default function CardDetailsPage() {
  const{getCardById,card,isLoading,error}=useCards()
  const{id}=useParams()
  const {isDark} =useTheme()
 
  useEffect(()=>{
    getCardById(id)
  },[getCardById,id])

  if (isLoading) return <Spinner/>
  if(error) return <Error errorMessage={error}/>

  return (
    <Container>
        <PageHeader
        title='Card Details'
        subtitle='Here you can find all the details about specific card '
        />
        <Box 
         sx={{
          ml:4,
          display: "flex",
          flexDirection:{xs:"column",md:"initial"},
          justifyContent: "space-between",
          color: isDark ? "white" : "black"
          
          }}>
           <Box 
             display='flex'
             sx={{
             alignItems:'start',  
             flexDirection:'column',
             width:{xs:"100%",md:'50%'}}}>
              <Typography fontSize={20}><strong>Card Details:</strong></Typography>
              <Avatar 
                sx={{borderRadius:1 ,width:'90%',height:300,mt:2 }}
                src={card.image?.url}
                alt={card.image?.alt}
              />  
              <Paper elevation={5} sx={{mt:2,p:2,mb:2,width:"85%"}}>       
                <Typography mt={1}><strong>Title:</strong> {card.title} </Typography>
                <Typography mt={1}><strong>Subtitle:</strong> {card.subtitle} </Typography>
                <Typography mt={1}><strong>BizNumber:</strong> {card.bizNumber} </Typography>
                <Typography mt={1}><strong>Description:</strong> {card.description} </Typography>
                <Typography mt={1}><strong>Email:</strong> {card.email}</Typography>
                <Typography mt={1}><strong>Phone: </strong> {card.phone} </Typography>
                <Typography mt={1}><strong>User Id:</strong> {card.user_id} </Typography>
                <Typography mt={1}><strong>CreateAT:</strong> {card.createdAt} </Typography>
                <Typography mt={1} mb={2} sx={{border:1,borderRadius:2,p:1,width:50}}>{card.likes.length} <FavoriteIcon color='error'/></Typography>
              </Paper>  
          </Box>


          <Box 
            sx={{ 
            width: {xs:"100%",md:"50%"},
            height:{xs:"100%",md:"400px"},
            }}>
              <Typography mb={2} textAlign='start' fontSize={20}><strong>Address Card:</strong></Typography>
              <Box  
              sx={{ 
                width: {xs:"90%",md:"90%"},
                height:{xs:"200px",md:"90%"},
              }}>
             <Map 
               center={[51.505, -0.09]}
               zoom={13}
               address={card.address?.city +" "+ card.address?.street +" "+ card.address?.houseNumber}
              />
              </Box>
              <Paper elevation={5} sx={{mt:2,p:2,mb:2,textAlign:'start',width:"85%"}}>
              <Typography mt={1}><strong>Country:</strong> {card.address?.country} </Typography>
              <Typography mt={1}><strong>City:</strong> {card.address?.city} </Typography>
              <Typography mt={1}><strong>Street:</strong> {card.address?.street} </Typography>
              <Typography mt={1}><strong>House Number:</strong> {card.address?.houseNumber} </Typography>
              </Paper>
          </Box>
        </Box>
    </Container>
  )
}
*/
