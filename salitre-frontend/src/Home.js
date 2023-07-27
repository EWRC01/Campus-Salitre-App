// src/Home.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Home() {
  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '50px',
    borderRadius: '10px',
    backgroundColor: '#ffffff', 
    userSelect: 'none', 
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
    textShadow: 'none', 
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#666',
    textShadow: 'none', 
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h1" sx={headingStyle}>
        Welcome to My App
      </Typography>
      <Typography variant="body1" sx={paragraphStyle}>
        Choose to Login or Register:
      </Typography>
    </Box>
  );
}

export default Home;
