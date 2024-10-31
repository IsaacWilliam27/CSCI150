import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Encrypt password before sending (optional)
  const encryptPassword = (password) => {
    const secretKey = 'frontend-encryption-key'; // Use a more secure method in production
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password: encryptPassword(password) // Optional encryption step
      });
      setMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password: encryptPassword(password) // Optional encryption step
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login or Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
