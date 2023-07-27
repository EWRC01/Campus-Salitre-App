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
        Bienvenido!
      </Typography>
      <Typography variant="body1" sx={paragraphStyle}>
        A la demo de la app Campus Salitre, Inicia Sesión para comenzar
      </Typography>
    </Box>
  );
}

export default Home;
