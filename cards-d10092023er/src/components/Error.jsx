import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const Error = ({ errorMessage }) => {
  return (
   <div>
      <PageHeader
        title="Error Page 404"
        subtitle="Page not found: please click the button below to go back to the home page"
      />
     
    <Box sx={{ minHeight: '90vh', marginTop: '50px' }}>
      <Box
        sx={{
          background: 'linear-gradient(to right, #0000FF, #FFD700 , #00FF00, #0000FF, #FFC0CB)', // Gradient background color
          width: "60%",
          margin: "auto",
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
        
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" color="initial" sx={{ marginBottom: '20px', color: '#fff' }}>
              Error Page 404
              <br/>
              Oops... something went wrong: {errorMessage}
              <br/>
              Page not found  
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/" // Link to the home page
              sx={{ color: 'white', bgcolor: 'primary.main', marginRight: '10px' }} // Custom button style
            >
              Go to Home
            </Button>
          </Grid>
          <Grid item xs={12} md={4} justifyContent="center">
            <img
              width="100%"
              src="/assets/images/broken-robot-error.png"
              alt="broken robot"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
  );
};

export default Error;
