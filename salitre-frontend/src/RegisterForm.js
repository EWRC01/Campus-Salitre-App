// src/RegisterForm.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();

    // Call the registration API endpoint with the provided credentials
    axios
      .post('http://localhost:5000/api/register', { username, password })
      .then((response) => {
        // Handle the response as needed (e.g., show a success message, redirect, etc.)
        console.log('Registration successful:', response.data);
        setSuccessMessage('Usuario Registrado con éxito');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setError('Error durante el registro');
      });
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none', // Evitar la selección de contenido en el formulario
  };

  const headingStyle = {
    marginBottom: '20px',
    userSelect: 'none', // Evitar la selección de contenido en el texto del encabezado
  };

  const inputStyle = {
    marginBottom: '10px',
    userSelect: 'none', // Evitar la selección de contenido en los campos de texto
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" align="center" sx={headingStyle}>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        {error && <ErrorAlert message={error} />} {/* Mostrar el alerta de error si hay un mensaje de error */}
        {successMessage && <SuccessAlert message={successMessage} />} {/* Mostrar el alerta de éxito si hay un mensaje de éxito */}
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          required
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterForm;
