import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user, openLogin } = useContext(AppContext);

  useEffect(() => {
    if (!user) {
      openLogin();
    }
  }, [user, openLogin]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;