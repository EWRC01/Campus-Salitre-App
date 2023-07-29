import React, { useState } from 'react';
import CultivationComboBox from './CultivationComboBox';
import AllCrops from './AllCrops';
import { Box, Typography } from '@mui/material';

const CultivationDetails = ({ cultivationData }) => {
  const [selectedCultivation, setSelectedCultivation] = useState("");

  const handleCultivationChange = (event) => {
    setSelectedCultivation(event.target.value);
  };

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

  return (
    <Box sx={containerStyle}>
      <Typography variant="h1" sx={headingStyle}>Selecciona un cultivo para ver los detalles</Typography>
      <CultivationComboBox
        name="cultivation"
        value={selectedCultivation}
        onChange={handleCultivationChange}
      />
      <AllCrops selectedCultivation={selectedCultivation} />
    </Box>
  );
};

export default CultivationDetails;
