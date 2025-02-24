import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import {
  DirectionsCar,
  Support,
  LocalHospital,
  Timer,
  Nightlight,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import autoImage from "../../assets/images/overlayimg.png";

const About = () => {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      {/* Top Three Line Full Width */}
      <Typography
        variant="h4"
        sx={{
          color: "#FFCC00",
          fontSize: "2.125rem",
          fontFamily: `"Montserrat", sans-serif`,
          textShadow: "0px 0px 1.5px rgba(0, 0, 0, 0.5)",
        }}
      >
        திருச்சி மாவட்டம் ஆன்லைன் ஆட்டோ ஓட்டுநர்கள் நலச்சங்கம்
      </Typography>
      <Typography
        variant="h5"
        fontWeight={500}
        color="textSecondary"
        gutterBottom
      >
        திருச்சி மாவட்டம் முழுவதும் எங்களுடைய ஆட்டோ கிடைக்கும்.
      </Typography>
      {/* <Typography variant="subtitle1" fontWeight={400} color="gray" gutterBottom>
        Reg No: TNTCJCLTRITU-50-24-00022
      </Typography> */}

      {/* Left Content - Right Image */}
      <Grid container spacing={4} alignItems="center" sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            எங்கள் பயணம்
          </Typography>
          <Typography variant="body1" gutterBottom>
            திருச்சி மாவட்டம் ஆன்லைன் ஆட்டோ ஓட்டுநர்கள் தொழிற்சங்கம் 2020 இல்
            நிறுவப்பட்டது.
          </Typography>
          <Typography variant="body1" gutterBottom>
            400க்கும் மேற்பட்ட நேர்மையான ஆட்டோ ஓட்டுநர்கள் இங்கு
            பணியாற்றுகின்றனர்.
          </Typography>
          <Typography variant="body1" gutterBottom>
            நியாயமான கட்டணத்தில் பாதுகாப்பான சேவையை உறுதி செய்கிறோம்.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.img
            src={autoImage}
            alt="Trichy Auto"
            width="100%"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </Grid>
      </Grid>

      {/* Why Us Section */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          ஏன் எங்களை தேர்வு செய்ய வேண்டும்?
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              icon: <DirectionsCar color="primary" fontSize="large" />,
              text: "நிபுணத்துவம் பெற்ற ஓட்டுநர்கள்",
            },
            {
              icon: <Support color="secondary" fontSize="large" />,
              text: "உண்மையான வாடிக்கையாளர் சேவை",
            },
            {
              icon: <LocalHospital color="error" fontSize="large" />,
              text: "அவசர உதவி 1.5KM இலவசம்",
            },
            {
              icon: <Timer color="success" fontSize="large" />,
              text: "காத்திருக்கக் கட்டணம் ₹1.50/நிமிடம்",
            },
            {
              icon: <Nightlight color="warning" fontSize="large" />,
              text: "இரவு கட்டணம் 50% அதிகம்",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                {item.icon}
                <Typography variant="body1" fontWeight={500}>
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pricing */}
      <Box
        mt={5}
        textAlign="center"
        sx={{ bgcolor: "#FFCC00", p: 3, borderRadius: "10px", boxShadow: 3 }}
      >
        <Typography variant="h6" fontWeight={700} color="black">
          அடிப்படை கட்டணம் (1.5KM) + வசதிக் கட்டணம்
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          ₹40 + ₹19 = ₹59
        </Typography>
        <Typography variant="h6" fontWeight={700} color="black">
          கிலோமீட்டர் கட்டணம்
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          ₹18
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
