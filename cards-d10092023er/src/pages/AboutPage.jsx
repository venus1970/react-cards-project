import React, { useState } from "react";
import {
  Typography,
  Box,
  Divider,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Map from "../cards/pages/Map";
import AccessibleIcon from "@mui/icons-material/Accessible";

const AboutPage = () => {
  const theme = useTheme();
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div
      style={{
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        padding: "20px",
        margin: "auto",
        width: { xs: "90%", md: "70%" },
        border: 5,
        borderColor: "white",
        textAlign: "center", // Added to center
      }}
    >
      <PageHeader
        title="About Page"
        subtitle="On this page you can find information and explanation about using the application"
      />

      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#C9F8F3",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          padding: "20px",
          margin: "20px auto",
          width: { xs: "90%", md: "70%" },
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(14, 122, 112, 0.2)",
          textAlign: "center", // Added to center align content
          marginTop: "30px",
          marginBottom: "0px",
        }}
      >
        <Avatar
          src="/assets/images/fav3.png"
          alt="About Image"
          sx={{
            width: "200px",
            height: "200px",
            marginBottom: "20px",
            margin: "auto", // Centering the avatar
            display: "block", // Ensuring avatar is centered
            border: `5px solid ${theme.palette.primary.main}`,
          }}
        />
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
        <Typography variant="body1">
          <strong>React Business Card Project: Explained Introduction, Key Functionality, and Conclusion</strong>
          <br />
          <br />
          <strong>Introduction</strong>
          <br />
          The React Business Card Project is a web application designed to streamline the management of business cards. It provides users with a platform to create, edit, and organize their business contacts efficiently. Built using React, the project offers a modern and user-friendly interface, coupled with robust features to enhance productivity and organization.
          <br /><br />

          <Typography variant="body1" align="left">
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
              {showFullContent && (
                <li>
                  <strong>Accessibility:</strong> Accessibility in React projects is crucial for ensuring that web applications are usable by everyone, including those with disabilities. This web application is more inclusive and usable for all users, regardless of their abilities or assistive technologies. Here's an explanation of various accessibility concepts in this React project:
                  <ul>
                    <li><strong>Alt Text:</strong> Alt text, or alternative text, is used to describe the content of an image. It is essential for users who are visually impaired or for situations where images cannot be loaded. In React, you can include alt text in JSX using the alt attribute of the img element.</li>
                    <li><strong>Labels:</strong> Proper labeling of interactive elements, such as form fields and buttons, is vital for screen reader users to understand the purpose of each element. The project uses the htmlFor attribute with the label element to associate a label with its corresponding form control.</li>
                    <li><strong>Titles:</strong> Titles for web pages and components help users navigate and understand the content better. You can set the title of a component using the document.title property or the title attribute on specific elements.</li>
                    <li><strong>Favicon:</strong> A favicon is the small icon displayed in the browser tab or next to the URL in the address bar. A favicon helps users identify your website easily when multiple tabs are open.</li>
                  </ul>
                </li>
              )}
                      
                            
              <AccessibleIcon              
                fontSize="large"                    
                color="primary"
                />
            </ol>
            
            {showFullContent && (
              <>
                <strong>Conclusion</strong>
                <br />
                The React Business Card Project offers a comprehensive solution for managing business contacts effectively. With its user-friendly interface, robust authentication system, and advanced features such as role-based access control and favorite cards management, the project caters to the needs of both individual users and businesses. Whether you're a professional looking to organize your contacts or an organization seeking to streamline communication, this project provides the tools you need to succeed.
                <br />
              </>
            )}
          </Typography>
          <Button
            onClick={toggleContent}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: theme.palette.mode === "dark" ? "#1976d2" : "#2196f3",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? "#1565c0" : "#1976d2",
              },
            }}
          >
            {showFullContent ? "Read Less" : "Read More"}
          </Button>
        </Typography>
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


        <Typography variant="body1" align="left">
          <strong>Card example: card like this, you can see on cards page</strong>
          <br />
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "20px auto",
            width: { xs: "90%", md: "50%" },
            height: "500px",
            border: 5,
            borderColor: "white",
            mt: 2,
            mb: 2,
          }}
        >
          <Avatar
            src="/assets/images/cardexample.png"
            alt="card"
            sx={{ width: "45%", height: "100%", borderRadius: 1 }}
          />
          <Map center={[51.505, -0.09]} zoom={14} address={"Tel aviv,Hashalom 10"} />


        </Box>

        <Typography variant="body1" align="left">
          <strong>Card Functionality:</strong>
          <br />

          <strong>Click on the Card:</strong> All users can click on the card to

          view more information about a user and card details include map location and contact.
        </Typography>

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
        <Typography variant="body1" align="left" marginBottom={4}>
          <strong>Dark and light mode:</strong>
          <br />
          <strong>switch to dark or light mode:</strong> The users have the option to choose between dark and light mode.
        </Typography>
        <Avatar
          src="/assets/images/dark_light.png"
          alt="card"
          sx={{
            width: "200px",
            height: "200px",
            marginBottom: "20px",
            margin: "auto", // Centering the avatar
            display: "block", // Ensuring avatar is centered
            border: `5px solid ${theme.palette.primary.main}`,
          }}
        />

      </Box>
    </div>
  );
};

export default AboutPage;
