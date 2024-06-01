import React from 'react';
import { AppBar, Box, Container, Divider, Toolbar, useTheme, Typography } from '@mui/material';
import NavItem from '../routes/components/NavItem';
import { Outlet } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SandBox() {
  const theme = useTheme();
   
  return (
    <Box sx={{ minHeight: '90vh', backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0', color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
      <AppBar position='sticky' color="transparent" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#111' : 'gray' }}>
        <Toolbar>
          <NavItem to="counter" label={<span style={{ color: 'red', fontWeight: '600' }}>Counter</span>} />
          <NavItem to="counter1" label={<span style={{ color: 'yellow', fontWeight: '600' }}>Counter1</span>} />
          <NavItem to="changesize" label={<span style={{ color: 'blue', fontWeight: '600' }}>Change size</span>} />
          <NavItem to="shapetransformer" label={<span style={{ color: 'lightgreen', fontWeight: '600' }}>Shape transformer</span>} />         
          <NavItem to="countries" label={<span style={{ color: 'orange', fontWeight: '600' }}>Countries list</span>} />
          <NavItem to="error" label={<span style={{ color: 'brown', fontWeight: '600' }}>Error</span>} />
          <NavItem to="window" label={<span style={{ color: 'blue', fontWeight: '600' }}>Window</span>} />
          <NavItem to="formexample" label={<span style={{ color: 'violet', fontWeight: '600' }}>FormExample</span>} />          
                  
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
      <PageHeader
        title="Sandbox"
        subtitle="Welcome to the Sandbox!"
      />
      <Box sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#f0f0f0', padding: '20px', marginTop: '20px' }}>
        <Typography variant="body1" align="left">
          This sandbox is your playground to experiment with different React components, features, and functionalities. Feel free to test out various concepts, try new libraries, or simply explore React's capabilities.
        </Typography>
        <Typography variant="body1">
          <br />
          <strong>Getting Started:</strong>
          <br />
          <strong>Counter:</strong> Check out how simple state management works with a basic counter component.
          <br />
          <strong>Form Example:</strong> Explore form handling and validation in React.
          <br />
          <strong>Shape Transformer:</strong> Experiment with CSS transitions and animations on shapes.
          <br />
          <strong>Life Cycle:</strong> Learn about React component lifecycle methods and their order of execution.
          <br />
          <strong>Countries:</strong> Fetch data from an API and display it dynamically in your app.
          <br />
          <strong>Optimization:</strong> Dive into performance optimization techniques for React components.
          <br />
          <strong>Context:</strong> Understand how to use React context for global state management.
          <br />
          <br />
          Have Fun Exploring!
          <br />
          <br />
          Feel free to adjust the text according to the specific components and features available in your sandbox. This text provides a brief overview of what users can expect and encourages them to experiment and learn in the sandbox environment.
        </Typography>
        <Divider sx={{ margin: '20px auto', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[...Array(3)].map((_, index) => (
            <FavoriteIcon key={index} color="error" fontSize="large" />
          ))}
        </Divider>
        <img src="assets/images/sandbox.jpg" alt="sandbox" style={{ maxWidth: '100%', display: 'block', margin: '0 auto', border: '3px solid #ccc', borderRadius: '10px' }} />
      </Box>
    </Box>
  );
}
