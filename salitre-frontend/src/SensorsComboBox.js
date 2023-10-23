import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { Box, Typography, TextField, Button } from '@mui/material';
function SensorsComboBox({ name, value, onChange }) {
  const [sensors, setSensors] = useState([]);

  const comboBoxStyle = {
    maxWidth: '500px',
    
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none',
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/get-sensors')
      .then((response) => {
        setSensors(response.data);
      })
      .catch((error) => {
        console.error('Error during fetching Sensors: ', error);
      });

  }, []);

  return (
   
    <Select
      name={name}
      value={value}
      onChange={onChange}
      sx={comboBoxStyle}
      variant="outlined"
      fullWidth
    >
      {/* Add an initial Blank Option */}
      <MenuItem value="">
        Selecciona una opción por favor
      </MenuItem>
      {sensors.map((type) => (
        <MenuItem key={type.ID_Sensor} value={type.ID_Sensor}>
          {type.Sensor_Name}
        </MenuItem>
      ))}
    </Select>
    
  );
}

export default SensorsComboBox;


