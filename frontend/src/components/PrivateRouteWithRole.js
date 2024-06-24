import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteWithRole = ({ children, kc }) => {
  if (!kc.authenticated) {
    return <Navigate to="/" />;
  }

  const userHasRole = kc.hasRealmRole("admin");

  if (!userHasRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouteWithRole;
