// client/src/components/PrivateRoute.js
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  // Fallback to localStorage if context not loaded yet
  const isLoggedIn = isAuthenticated || localStorage.getItem('token');
  
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;