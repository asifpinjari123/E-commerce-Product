import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Paper, Typography} from '@mui/material';
import Coffee1 from '../../assets/Carousual_Images/Coffee 1.jpg';
import Coffee2 from '../../assets/Carousual_Images/Coffee 2.webp';
import Coffee3 from '../../assets/Carousual_Images/Coffee 3.jpg';
import Coffee4 from '../../assets/Carousual_Images/Coffee 4.jpg';
import Coffee5 from '../../assets/Carousual_Images/Coffee 5.webp';
import Coffee6 from '../../assets/Carousual_Images/Coffee 6.webp';
import Coffee7 from '../../assets/Carousual_Images/Coffee 7.webp';
import Coffee8 from '../../assets/Carousual_Images/Coffee 8.webp';
import Coffee9 from '../../assets/Carousual_Images/Coffee.jpg';
import Coffee10 from '../../assets/Carousual_Images/Coffee.png';
import Coffee11 from '../../assets/Carousual_Images/Coffee.webp';
import Coffee12 from '../../assets/Carousual_Images/Coffee.webp';

const images = [
  Coffee1,
  Coffee2,
  Coffee3,
  Coffee4,
  Coffee5,
  Coffee6,
  Coffee7,
  Coffee8,
  Coffee9,
  Coffee10,
  Coffee11,
  Coffee12,
];

const landingPageStyles = {
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: '100vh',
    objectFit: 'cover',
    transition: 'opacity 1s ease-in-out',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 0,
    padding: '16px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: '16px',
  },
};

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Box style={landingPageStyles.container}>
        <img
          src={images[currentIndex]}
          alt="images"
          style={landingPageStyles.carouselImage}
        />
        <Paper elevation={3} style={landingPageStyles.content}>
          <Typography component="h1" variant="h3">
            Welcome to our Product Management System
          </Typography>
          <Typography variant="body1">
            Explore and add your favorite products. Please sign up to get started.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default LandingPage;
