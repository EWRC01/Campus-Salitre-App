// src/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Call the login API endpoint with the provided credentials
    axios.post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        // Handle the response as needed (e.g., set authentication token, redirect, etc.)
        console.log('Login successful:', response.data);
        alert('Inicio de sesion exitoso')
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert('Error al iniciar sesion, revise el usuario o contraseña', error);
        // Handle errors, such as displaying an error message to the user
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
