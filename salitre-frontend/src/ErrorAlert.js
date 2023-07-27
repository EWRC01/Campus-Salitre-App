import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { red } from '@mui/material/colors';

const ErrorAlert = ({ message }) => {
  return (
    <Alert severity="error" sx={{ backgroundColor: red[600], color: '#fff', borderRadius: '10px', marginBottom: '20px' }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
