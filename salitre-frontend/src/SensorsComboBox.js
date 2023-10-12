import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

function SensorsComboBox({ name, value, onChange }) {
  const [sensors, setSensors] = useState([]);

  const comboBoxStyle = {
    padding: '6px 12px', // Ajusta el padding para reducir el tamaño del ComboBox
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    width: '100%',
    outline: 'none',
    userSelect: 'none',
    fontSize: '14px', // Ajusta el tamaño de fuente para reducir el tamaño del texto
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


