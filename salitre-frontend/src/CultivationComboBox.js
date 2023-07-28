import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';

function CultivationComboBox({ name, value, onChange }) {
  const [cultivationTypes, setCultivationTypes] = useState([]);

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
    axios.get('http://localhost:5000/api/types-cultivation')
      .then((response) => {
        setCultivationTypes(response.data);
      })
      .catch((error) => {
        console.error('Error during fetching cultivation types: ', error);
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
      {cultivationTypes.map((type) => (
        <MenuItem key={type.ID_Type_Cultivation} value={type.ID_Type_Cultivation}>
          {type.Name_Type_Cultivation}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CultivationComboBox;


