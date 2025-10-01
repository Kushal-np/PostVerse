import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function ProtectedRoute({ children, allowedRoles }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/feed" />;
  }
  return children;
}

export default ProtectedRoute;