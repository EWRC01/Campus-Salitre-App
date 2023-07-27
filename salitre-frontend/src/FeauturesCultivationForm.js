import React, { useState } from "react";
import axios from 'axios';
import CultivationComboBox from './CultivationComboBox';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';
import {  useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleFormSubmit}>
        {error && <ErrorAlert message={error} />} {/* Mostrar el alerta de error si hay un mensaje de error */}
        {successMessage && <SuccessAlert message={successMessage} />} {/* Mostrar el alerta de éxito si hay un mensaje de éxito */}
        <h2>Agregar Requerimientos de Cultivo</h2>
        
      <div>
        <label htmlFor="ID_Type_Cultivation">Tipo de Cultivo:</label>
        <CultivationComboBox
          name="ID_Type_Cultivation"
          value={formData.ID_Type_Cultivation}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Required_Relative_Humidity">Humedad Relativa Requerida:</label>
        <input
          type="text"
          name="Required_Relative_Humidity"
          value={formData.Required_Relative_Humidity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="Required_Temperature">Temperatura Requerida:</label>
        <input
          type="text"
          name="Required_Temperature"
          value={formData.Required_Temperature}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="Required_Oxygen">Oxigeno Requerido:</label>
        <input
          type="text"
          name="Required_Oxygen"
          value={formData.Required_Oxygen}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Añadir</button>
      <button onClick={Redirect}>Regresar a tipo de cultivo</button>
    </form>
  );
}

export default FeaturesCultivationForm;
