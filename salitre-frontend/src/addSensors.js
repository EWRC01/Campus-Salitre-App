import React, { Component } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';

class AddSensor extends Component {
  constructor() {
    super();
    this.state = {
      Sensor_Name: '',
      Sensor_Status: '',
      Sensor_Description: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/add-sensor', this.state)
      .then(response => {
        console.log(response.data);
        // Reset the form or provide feedback to the user
      })
      .catch(error => {
        console.error('Error adding sensor:', error);
      });
  }

  render() {
    const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    userSelect: 'none',
    };

    const headingStyle = {
      fontSize: '36px',
      color: '#333',
      marginBottom: '20px',
      textShadow: 'none',
      userSelect: 'none',
    };

    const inputStyle = {
      fontSize: '18px',
      marginBottom: '20px',
      userSelect: 'none',
    };

    return (
      <Box sx={containerStyle}>
        <Typography variant="h1" sx={headingStyle}>
          Agregar Sensor
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Nombre del Sensor"
            variant="outlined"
            name="Sensor_Name"
            value={this.state.Sensor_Name}
            fullWidth
            onChange={this.handleChange}
            sx={inputStyle}
          />
          <TextField
            label="Estado del Sensor"
            variant="outlined"
            name="Sensor_Status"
            value={this.state.Sensor_Status}
            fullWidth
            onChange={this.handleChange}
            sx={inputStyle}
          />
          <TextField
            label="Descripción del Sensor"
            variant="outlined"
            name="Sensor_Description"
            value={this.state.Sensor_Description}
            fullWidth
            onChange={this.handleChange}
            sx={inputStyle}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Agregar Sensor
          </Button>
        </form>
      </Box>
    );
  }
}

export default AddSensor;
