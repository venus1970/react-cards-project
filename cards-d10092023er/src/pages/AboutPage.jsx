import { Typography, Box, Divider, useTheme } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AboutPage() {
  const theme = useTheme();

  return (
    <div>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      
      <Box sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f0f0f0', color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', padding: '20px' }}>
        <Typography variant="body1" >
          <strong>React Business Card Project: Explained Introduction, Key Functionality, and Conclusion</strong>
          <br />
          <br />
          <strong>Introduction</strong>
          <br />
          The React Business Card Project is a web application designed to streamline the management of business cards. It provides users with a platform to create, edit, and organize their business contacts efficiently. Built using React, the project offers a modern and user-friendly interface, coupled with robust features to enhance productivity and organization.
          <br /><br />
          <strong>Key Functionality</strong>
          <br />
          <ol>
            <li>
              <strong>Business Card Management:</strong> The core functionality of the project revolves around managing business cards. Users can create, edit, and delete business cards, allowing them to keep their contact database up-to-date.
            </li>
            <li>
              <strong>User Authentication:</strong> The project includes a robust authentication system to ensure secure access to user accounts. Key features include user registration, login, and token-based authentication for secure access to protected resources.
            </li>
            <li>
              <strong>Role-based Access Control:</strong> Role-based access control (RBAC) is implemented to manage user permissions effectively. Admin users have elevated privileges, while regular users have standard access to business card management features.
            </li>
            <li>
              <strong>Favorite Business Cards:</strong> Users can mark specific business cards as favorites for quick access and prioritization, streamlining their workflow.
            </li>
            <li>
              <strong>Dynamic Navigation:</strong> The application features a dynamic navigation menu that adjusts based on the user's role and permissions, providing intuitive access to various sections of the application.
            </li>
          </ol>
          <br />
          <strong>Conclusion</strong>
          <br />
          The React Business Card Project offers a comprehensive solution for managing business contacts effectively. With its user-friendly interface, robust authentication system, and advanced features such as role-based access control and favorite cards management, the project caters to the needs of both individual users and businesses. Whether you're a professional looking to organize your contacts or an organization seeking to streamline communication, this project provides the tools you need to succeed.
        </Typography>
        <Divider sx={{ margin: '20px auto', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[...Array(3)].map((_, index) => (
            <FavoriteIcon key={index} color="error" fontSize="large" />
          ))}
        </Divider>
      </Box>
    </div>
  );
}
