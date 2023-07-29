import React, { useState } from 'react';
import CultivationComboBox from './CultivationComboBox';
import AllCrops from './AllCrops';

const CultivationDetails = ({cultivationData}) => {
  const [selectedCultivation, setSelectedCultivation] = useState("");

  const handleCultivationChange = (event) => {
    setSelectedCultivation(event.target.value);
  };

  return (
    <div>
      <h1>Selecciona un cultivo para ver los detalles</h1>
      <CultivationComboBox
        name="cultivation"
        value={selectedCultivation}
        onChange={handleCultivationChange}
      />
      <AllCrops selectedCultivation={selectedCultivation} />
    </div>
  );
};

export default CultivationDetails;
