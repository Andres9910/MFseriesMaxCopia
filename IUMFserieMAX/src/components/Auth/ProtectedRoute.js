import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component, isAdmin }) => {
  const { isAuthenticated, isAdminAuthenticated } = useContext(AuthContext);

  // if (isAdmin) {
  //   return isAdminAuthenticated ? Component : <Navigate to="/admin-login" />;
  // }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;