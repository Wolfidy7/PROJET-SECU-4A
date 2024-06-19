import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Keycloak from './useKeycloak';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Keycloak.authenticated ? (
        <Component {...props} />
      ) : (
        <Navigate to="/" />
      )
    }
  />
);

export default PrivateRoute;
