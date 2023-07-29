import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

function AllCrops({ selectedCultivation }) {
  const [cultivationData, setCultivationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCultivation !== "") {
      axios.get(`http://localhost:5000/api/all-crops?ID_Type_Cultivation=${selectedCultivation}`)
        .then((response) => {
          console.log('API RESPONSE:', response.data)
          setCultivationData(response.data.length > 0 ? response.data[0] : null);
        })
        .catch((error) => {
          console.error('Error during fetching crop features: ', error);
          setError('Error al cargar los detalles del cultivo');
        });
    } else {
      // Reset the cultivationData when no ID is selected
      setCultivationData(null);
    }
  }, [selectedCultivation]);

  const containerStyle = {
    maxWidth: '400px',
    margin: '20px auto',
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

  const labelStyle = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '5px',
  };

  const inputStyle = {
    fontSize: '16px',
    color: '#555',
    padding: '8px',
    marginBottom: '15px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#f5f5f5',
  };

  return (
    <Box sx={containerStyle}>
      {error && <ErrorAlert message={error} />}
      {/* Use cultivationData to display the fields */}
      {cultivationData ? (
        <div>
          <Typography variant="h2" sx={headingStyle}>Cultivation Details</Typography>
          <Typography variant="subtitle1" sx={labelStyle}>ID_Cultivation:</Typography>
          <TextField variant="outlined" value={cultivationData.ID_Cultivation} fullWidth disabled sx={inputStyle} />
          <Typography variant="subtitle1" sx={labelStyle}>Required Relative Humidity:</Typography>
          <TextField variant="outlined" value={cultivationData.Required_Relative_Humidity} fullWidth disabled sx={inputStyle} />
          <Typography variant="subtitle1" sx={labelStyle}>Required Temperature:</Typography>
          <TextField variant="outlined" value={cultivationData.Required_Temperature} fullWidth disabled sx={inputStyle} />
          <Typography variant="subtitle1" sx={labelStyle}>Required Oxygen:</Typography>
          <TextField variant="outlined" value={cultivationData.Required_Oxygen} fullWidth disabled sx={inputStyle} />
        </div>
      ) : (
        <Typography variant="h2">No se han registrado detalles para este cultivo</Typography>
      )}
    </Box>
  );
}

export default AllCrops;
