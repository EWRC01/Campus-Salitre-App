// src/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Call the registration API endpoint with the provided credentials
    axios.post('http://localhost:5000/api/register', { username, password })
      .then((response) => {
        // Handle the response as needed (e.g., show a success message, redirect, etc.)
        console.log('Registration successful:', response.data);
        alert('Usuario Registrado con exito');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert.error('Error during Registration');
        // Handle errors, such as displaying an error message to the user
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
