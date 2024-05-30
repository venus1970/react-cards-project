import React from "react";
import {
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ContactUs = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        padding: "30px",
        margin: "auto",
        width: "80%",
        textAlign: "center",
      }}
    >
      <PageHeader title="Contact Us" subtitle="Get in touch with us" />
      <Box>
       <Card
  sx={{
    marginTop: "30px",
    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#C9F8F3', 
    color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
    borderRadius: "10px",
    boxShadow: theme.palette.mode === 'dark' ? "0px 0px 10px rgba(255, 255, 255, 0.5)" : "0px 0px 10px rgba(0, 0, 0, 0.25)", // White shadow in dark mode
    border: "1px solid rgba(14, 122, 112, 0.2)"
  }}
>
          <CardContent>
            <Avatar
              src="/assets/images/contact_us.png"
              alt="card"
              sx={{
                width: "15%",
                height: "15%",
                borderRadius: 5,
                border: "2px solid red",
                margin: "auto",
              }}
            />
            <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
            <Typography variant="body1" gutterBottom>
              <strong>Contact Details:</strong>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <EmailIcon />{" "}
                <Typography variant="body1">
                  Email: example@example.com
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <PhoneIcon />{" "}
                <Typography variant="body1">
                  Phone: +1 234 567 8901
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <LocationOnIcon />{" "}
                <Typography variant="body1">
                  Address: 123 hashalom, Tel Aviv, Israel
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
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
          <CardContent>
            <Typography variant="body1" marginBottom="10px">
              Feel free to reach out to us via email, phone, or visit our
              office during working hours.
            </Typography>

            <Avatar
              src="/assets/images/map.png"
              alt="card"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "900px", // Maximum width to maintain aspect ratio
                marginBottom: "50px",
                borderRadius: "10px",
                borderColor: "red",
                border: "3px solid red",
                margin: "auto", // Centering the avatar
                display: "block", // Ensuring avatar is centered
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ContactUs;
