import React, { useState, useEffect } from "react";
import axios from 'axios';

function AllCrops({ selectedCultivation }) {
  const [cultivationData, setCultivationData] = useState(null);

  useEffect(() => {
    if (selectedCultivation !== "") {
      axios.get(`http://localhost:5000/api/all-crops?ID_Type_Cultivation=${selectedCultivation}`)
        .then((response) => {
          console.log('API RESPONSE:', response.data)
          setCultivationData(response.data.length > 0 ? response.data[0] : null);
        })
        .catch((error) => {
          console.error('Error during fetching crop features: ', error);
        });
    } else {
      // Reset the cultivationData when no ID is selected
      setCultivationData(null);
    }
  }, [selectedCultivation]);

  if (!selectedCultivation) {
    return null; // Don't render anything if no ID is selected
  }

  return (
    <div>
      {/* Use cultivationData to display the fields */}
      {cultivationData ? (
        <div>
          <h2>Cultivation Details</h2>
          <label>ID_Cultivation:</label>
          <input type="text" value={cultivationData.ID_Cultivation} readOnly />
          <label>Required Relative Humidity:</label>
          <input type="text" value={cultivationData.Required_Relative_Humidity} readOnly />
          <label>Required Temperature:</label>
          <input type="text" value={cultivationData.Required_Temperature} readOnly />
          <label>Required Oxygen:</label>
          <input type="text" value={cultivationData.Required_Oxygen} readOnly />
        </div>
      ) : (
        <h2>No se han registrado detalles para este cultivo</h2>
      )}
    </div>
  );
}

export default AllCrops;
