import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from '@mui/material';
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import { useNavigate } from 'react-router-dom';
import CultivationComboBox from "./CultivationComboBox";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
function RegisterCultivation() {
  const [nameCultivation, setNameCultivation] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const Redirect = () => {
    navigate('/features-crop');
  }

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none', // Evita que se pueda seleccionar el contenido
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  };

  const inputStyle = {
    marginBottom: '20px',
  };

  const buttonStyle = {
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    outline: 'none',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px', // Agrega un espacio entre los botones
  };

  

 
  const handleCultivationRegister = (e) => {
    e.preventDefault();

    // Call the API to register the cultivation
    axios.post('http://localhost:5000/api/registertypecultivation', {
      nameCultivation
    })
    .then((response) => {
      console.log('Cultivo Registrado con exito');
      setSuccessMessage('Cultivo Registrado con exito');
    })
    .catch((error) => {
      setError('Error al registrar el cultivo');
    });
  };

  return (
    <Box sx={containerStyle}>
      {error && <ErrorAlert message={error} />}
      {successMessage && <SuccessAlert message={successMessage} />}
      <Typography variant="h2" sx={headingStyle}>Cultivos Existentes:</Typography>
      <CultivationComboBox />
      <Typography variant="h2" sx={headingStyle}>Agrega un nuevo cultivo</Typography>
      <TextField
        label="Nombre de cultivo"
        variant="outlined"
        value={nameCultivation}
        required
        fullWidth
        onChange={(e) => setNameCultivation(e.target.value)}
        sx={inputStyle}
      />
      <Button variant="contained" onClick={handleCultivationRegister} color="primary" type="submit" fullWidth sx={buttonStyle}>
        <span>Agregar el cultivo</span>
        <span>&#43;</span> {/* Icono de más para el botón */}
      </Button>
      <Button variant="contained"
          color="secondary"
          fullWidth
          onClick={Redirect}
          startIcon={<ControlPointDuplicateIcon />} sx={{ buttonStyle}}>
        
        Agregar Requerimientos
      </Button>
    </Box>
  );
}

export default RegisterCultivation;


