import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">HTTP Dogs</Link>
      {isAuthenticated ? (
        <>
          <Link to="/search">Search</Link>
          <Link to="/list">My Lists</Link>
          <span>Welcome, {user?.username}</span>
          <button onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;