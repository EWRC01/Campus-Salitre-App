// src/RegisterForm.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/register', { username, password })
      .then((response) => {
        console.log('Registration successful:', response.data);
        setSuccessMessage('Usuario Registrado con éxito');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setError('Error durante el registro');
      });
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const containerStyle = {
    display: 'flex',
     // Hace que el contenedor ocupe todo el ancho de la página
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none',
  };

  const headingStyle = {
    marginBottom: '20px',
    userSelect: 'none',
  };

  const inputStyle = {
    marginBottom: '10px',
    userSelect: 'none',
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={formStyle}>
        <Typography variant="h4" align="center" sx={headingStyle}>
          Registrate
        </Typography>
        <form onSubmit={handleRegister}>
          {error && <ErrorAlert message={error} />}
          {successMessage && <SuccessAlert message={successMessage} />}
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
            Registrar
          </Button>
          <Typography variant="body2" align="center" onClick={goToLogin} style={{cursor: "pointer", marginTop:"10px"}}>
              Regresar
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default RegisterForm;
