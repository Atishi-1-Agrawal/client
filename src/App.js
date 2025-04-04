import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Lists from './pages/Lists';
import EditList from './pages/EditList';
import ListDetail from './pages/ListDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/search" 
                element={
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/lists" 
                element={
                  <PrivateRoute>
                    <Lists />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/lists/:id" 
                element={
                  <PrivateRoute>
                    <ListDetail />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/lists/:id/edit" 
                element={
                  <PrivateRoute>
                    <EditList />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/search" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;