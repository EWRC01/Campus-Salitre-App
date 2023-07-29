// src/LoginForm.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import {  useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Call the login API endpoint with the provided credentials
    axios
      .post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        // Handle the response as needed (e.g., set authentication token, redirect, etc.)
        if(response.data.success) {
        console.log('Login successful:', response.data);
        setSuccessMessage('Inicio de sesión exitoso');
        navigate('/register-crop');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setError('Error al iniciar sesión, revise el usuario o contraseña');
      });
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none', // Evitar la selección de contenido en el formulario
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
    textShadow: 'none', // Eliminamos el sombreado del texto
    userSelect: 'none', // Evitar la selección de contenido en el texto del encabezado
  };

  const inputStyle = {
    fontSize: '18px',
    marginBottom: '20px',
    userSelect: 'none', // Evitar la selección de contenido en los campos de texto
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h1" sx={headingStyle}>
        Inicia Sesión
      </Typography>
      <form onSubmit={handleLogin}>
        {error && <ErrorAlert message={error} />} {/* Mostrar el alerta de error si hay un mensaje de error */}
        {successMessage && <SuccessAlert message={successMessage} />} {/* Mostrar el alerta de éxito si hay un mensaje de éxito */}
        <TextField
          label="Usuario"
          variant="outlined"
          value={username}
          required
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Entrar
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
