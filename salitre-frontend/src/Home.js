import React from 'react';
import SensorChart from './sensorChart';
import Sensor2 from './Sensor2';
import Sensor3 from './Sensor3';
import { Box, Typography, TextField, Button } from '@mui/material';
import SensorsComboBox from './SensorsComboBox';


function Home() {
  return (
    <div className='container'>
     

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} >
     
        
       
        <div className='container-sensor'>
        <SensorsComboBox />
        </div>
          <SensorChart sx={{ color: '#333' }} />
          <Sensor2 sx={{ color: '#333' }} />
          <Sensor3 sx={{ color: '#333' }} />
       
        
      
          
       
      </Box>
    </div>
  );
}

export default Home;
