import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        // Redirect to login if no token is found
        navigate('/login');
        return;
      }

      try {
        // Send GET request to the protected route with the token in Authorization header
        const response = await axios.get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch data');
        // Redirect to login if token is invalid or expired
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
