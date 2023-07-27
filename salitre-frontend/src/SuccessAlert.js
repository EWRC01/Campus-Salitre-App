import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { green } from '@mui/material/colors';

const SuccessAlert = ({ message }) => {
  return (
    <Alert severity="success" sx={{ backgroundColor: green[600], color: '#fff', borderRadius: '10px', marginBottom: '20px' }}>
      <AlertTitle>Success</AlertTitle>
      {message}
    </Alert>
  );
};

export default SuccessAlert;
