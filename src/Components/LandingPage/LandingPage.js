  import React, { useState, useEffect } from 'react';
  import { Box, CssBaseline, Paper, Typography,} from '@mui/material';

  import LoginDialog from '../Auth/Login'; // Import the LoginDialog component
  import SignupDialog from '../Auth/SignUp';
  // Import your images here
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'relative',
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity 1s ease-in-out',
    },
    content: {
      backgroundColor: 'rgba(300, 300, 300, 0.5)',
      borderRadius: '16px',
      padding: '16px',
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    button: {
      marginTop: '16px',
    },
  };
  function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      // Check for a logged-in user in local storage
      // const storedUser = localStorage.getItem('user');
      // if (storedUser) {
      //   setUser(storedUser);
      // }

      return () => clearInterval(timer);
    }, []);

    const handleLogin = (username) => {
      // setUser(username);
    };

    const handleLogout = () => {
      // Remove user data from local storage
      // localStorage.removeItem('user');
      // setUser(null);
    };

    const handleSignup = (username) => {
      // // Save user data to local storage
      // localStorage.setItem('user', username);
      // setUser(username);
    };

    const openSignupForm = () => {
      setSignupOpen(true); // Open the signup form when called
    };


    return (
      <Box>
      <CssBaseline />
      <Box style={landingPageStyles.container}>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          style={landingPageStyles.carouselImage}
        />
        <Paper elevation={3} style={landingPageStyles.content}>
          <Typography component="h1" variant="h3">
          You are welcome to view and add the products of your choice, please sign up and proceed. 
          </Typography>
          
        </Paper>
      </Box>
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
      <SignupDialog open={signupOpen} onClose={() => setSignupOpen(false)} onSignup={handleSignup} />
    </Box>
    );
  }

  export default LandingPage;
