import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Paper
      elevation={3}
      style={{
        position: 'sticky', // Position ko sticky banaye
        bottom: 0,
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          Contact: asifmansuri736@gmail.com | Phone: 9112150284
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
