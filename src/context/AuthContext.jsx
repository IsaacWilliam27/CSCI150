// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Mock login function (replace with real API call if needed)
  const login = async (username, password) => {
    // Example: Replace this with actual authentication logic
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' }); // Set a mock user
      navigate('/');
    } else {
      console.error('Login failed');
    }
  };

  // Mock logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from storage
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    // Check for a token in localStorage to persist the session
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' }); // Assume user is logged in if token exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
