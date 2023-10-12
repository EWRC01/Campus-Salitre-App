import React, { Component } from 'react';
import axios from 'axios'; // Import Axios

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
    // Send a POST request to the server to add the new sensor using Axios
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
    return (
      <div>
        <h2>Add Sensor</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Sensor Name:
            <input type="text" name="Sensor_Name" value={this.state.Sensor_Name} onChange={this.handleChange} />
          </label>
          <label>
            Sensor Status:
            <input type="text" name="Sensor_Status" value={this.state.Sensor_Status} onChange={this.handleChange} />
          </label>
          <label>
            Sensor Description:
            <textarea name="Sensor_Description" value={this.state.Sensor_Description} onChange={this.handleChange} />
          </label>
          <button type="submit">Add Sensor</button>
        </form>
      </div>
    );
  }
}

export default AddSensor;
