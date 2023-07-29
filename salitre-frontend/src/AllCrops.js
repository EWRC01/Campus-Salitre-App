import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import ErrorAlert from "./ErrorAlert";


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

  const tableStyle = {
    minWidth: 400,
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
  };

  const tableHeaderCellStyle = {
    backgroundColor: '#f5f5f5',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  const tableCellStyle = {
    fontSize: '16px',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  return (
    <Box sx={containerStyle}>
      {error && <ErrorAlert message={error} />}
      {/* Use cultivationData to display the fields */}
      {cultivationData ? (
        <div>
          <Typography variant="h2" sx={headingStyle}>Detalles de Cultivos</Typography>
          <TableContainer sx={tableStyle}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={tableHeaderCellStyle}>ID:</TableCell>
                  <TableCell sx={tableCellStyle}>{cultivationData.ID_Cultivation}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeaderCellStyle}>Humedad Relativa Necesaria:</TableCell>
                  <TableCell sx={tableCellStyle}>{cultivationData.Required_Relative_Humidity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeaderCellStyle}>Temperatura Necesaria:</TableCell>
                  <TableCell sx={tableCellStyle}>{cultivationData.Required_Temperature}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={tableHeaderCellStyle}>Oxigeno Necesario:</TableCell>
                  <TableCell sx={tableCellStyle}>{cultivationData.Required_Oxygen}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Typography variant="h4">No se han registrado detalles para este cultivo</Typography>
      )}
    </Box>
  );
}

export default AllCrops;
