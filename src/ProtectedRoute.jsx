 import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from './firebase';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => {
        setIsAuthenticated(true);
        setLoading(false);
        console.log('User is authenticated');
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
        console.log('User is not authenticated');
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/signin" replace />;
}