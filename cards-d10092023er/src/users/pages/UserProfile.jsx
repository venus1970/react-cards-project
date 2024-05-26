import React, { useEffect, useState } from 'react';
import useUsers from '../hooks/useUsers';
import { useUser } from '../providers/UserProvider';
import { Avatar, Box, Container, IconButton, Paper, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import Spinner from '../../components/Spinner';
import EditIcon from '@mui/icons-material/Edit';
import PageHeader from '../../components/PageHeader';
import Map from '../../cards/pages/Map';

export default function UserProfile() {
  const { handleGetUser } = useUsers();
  const { user } = useUser();
  const [userFullData, setUserFullData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userData = await handleGetUser(user._id);
        setUserFullData(userData);
      }
    };
    fetchUserData();
  }, [user, handleGetUser]);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;
  if (!userFullData) return <Spinner />;

  return (
    <Container>
      <PageHeader
        title="User's Profile"
        subtitle="Here you can find all the user details"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          width={{ xs: '90%', md: '50%' }}
        >
          <Avatar
            alt={userFullData.image?.alt || ''}
            src={userFullData.image?.url || ''}
            sx={{ width: 230, height: 230, border: 1 }}
          />
          <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
            <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
              {`${userFullData.name.first} ${userFullData.name.middle || ''} ${userFullData.name.last}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {userFullData.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {userFullData.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong>{' '}
              {`${userFullData.address.street} ${userFullData.address.houseNumber}, 
                ${userFullData.address.city}, ${userFullData.address.state}, 
                ${userFullData.address.country}, ${userFullData.address.zip}`}
            </Typography>
            <IconButton aria-label="EditIcon" onClick={() => navigate(ROUTES.EDIT_USER)}>
              <EditIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ m: 2, width: { xs: '90%', md: '40%' }, height: { xs: '350px', md: '450px' } }}>
          <Map
            center={[51.505, -0.09]}
            zoom={13}
            address={`${userFullData.address.city} ${userFullData.address.street} ${userFullData.address.houseNumber}`}
          />
        </Box>
      </Box>
    </Container>
  );
}
