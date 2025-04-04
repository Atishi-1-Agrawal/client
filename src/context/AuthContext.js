// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load initial state from localStorage if available
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: localStorage.getItem('token') ? true : false
  });

  // Set axios headers and localStorage when token changes
  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['x-auth-token'] = authState.token;
      localStorage.setItem('token', authState.token);
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [authState.token, authState.user]);

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      setAuthState({
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true
      });
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};