import React, { useState } from "react";
import axios from 'axios';
import CultivationComboBox from './CultivationComboBox';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FeaturesCultivationForm() {
  const [formData, setFormData] = useState({
    ID_Type_Cultivation: "",
    Required_Relative_Humidity: "",
    Required_Temperature: "",
    Required_Oxygen: ""
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const Redirect = () => {
    navigate('/register-crop');
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/features-cultivation', formData)
      .then((response) => {
        console.log('Cultivation record created successfully:', response.data);
        setSuccessMessage('Requerimientos de Cultivo Agregado con Exito!');
        // Do any additional actions or show success message if needed
      })
      .catch((error) => {
        console.error('Error creating cultivation record:', error);
        setError('Error al agregar los requerimientos!')
        // Handle errors, show error message, etc.
      });
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: '0 auto', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>
        Agregar Requerimientos de Cultivo
      </Typography>
      <form onSubmit={handleFormSubmit}>
        {error && <ErrorAlert message={error} />} {/* Mostrar el alerta de error si hay un mensaje de error */}
        {successMessage && <SuccessAlert message={successMessage} />} {/* Mostrar el alerta de éxito si hay un mensaje de éxito */}
        <div>
          <label htmlFor="ID_Type_Cultivation">Tipo de Cultivo:</label>
          <CultivationComboBox
            name="ID_Type_Cultivation"
            value={formData.ID_Type_Cultivation}
            onChange={handleInputChange}
          />
        </div>
        <TextField
          label="Humedad Relativa Requerida"
          variant="outlined"
          type="text"
          name="Required_Relative_Humidity"
          value={formData.Required_Relative_Humidity}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Temperatura Requerida"
          variant="outlined"
          type="text"
          name="Required_Temperature"
          value={formData.Required_Temperature}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Oxigeno Requerido"
          variant="outlined"
          type="text"
          name="Required_Oxygen"
          value={formData.Required_Oxygen}
          onChange={handleInputChange}
          required
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          startIcon={<AddCircleIcon />}
        >
          Añadir
        </Button>
        <Box sx={{ height: '10px' }} /> {/* Espacio entre los botones */}
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={Redirect}
          startIcon={<ArrowBackIcon />}
        >
          Regresar a tipo de cultivo
        </Button>
      </form>
    </Box>
  );
}

export default FeaturesCultivationForm;
