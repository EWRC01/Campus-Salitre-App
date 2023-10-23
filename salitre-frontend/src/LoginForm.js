// src/LoginForm.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        if(response.data.success) {
          console.log('Login successful:', response.data);
          setSuccessMessage('Inicio de sesión exitoso');
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setError('Error al iniciar sesión, revise el usuario o contraseña');
      });
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const containerStyle = {
  

  };

  const formStyle = {
    
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none',
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#333',
    marginBottom: '20px',
    textShadow: 'none',
    userSelect: 'none',
    
  };

  const inputStyle = {
    fontSize: '18px',
    marginBottom: '20px',
    userSelect: 'none',
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={formStyle}>
        <Typography variant="h1" align='center' sx={headingStyle}>
          Inicia Sesión
        </Typography>
        <form onSubmit={handleLogin}>
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
            Entrar
          </Button>
          <Typography variant="body2" align="center" onClick={goToRegister} style={{cursor: "pointer", marginTop:"10px"}}>
              ¿Es tu primera vez? Regístrate
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
