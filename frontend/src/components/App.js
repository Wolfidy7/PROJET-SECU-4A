import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../styles/App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';
import Home from './Home';
import KeycloakButton from './KeycloakButtons';

const initOptions = {
  url: 'http://172.17.0.1:8080/',
  realm: 'myrealm',
  clientId: 'myclient',
}

let kc; // Declare Keycloak instance outside the component

const PrivateRoute = ({ children }) => {
  return kc && kc.authenticated ? children : <Navigate to="/" />;
};

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    if (!kc) {
      kc = new Keycloak(initOptions);
      kc.init({
        onLoad: 'login-required',
        checkLoginIframe: true,
        pkceMethod: 'S256'
      }).then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          console.info("Authenticated");
          httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

          kc.onTokenExpired = () => {
            console.log('token expired');
            kc.updateToken(10).catch(() => {
              kc.login();
            });
          }
          setKeycloakInitialized(true);
        }
      }, () => {
        console.error("Authentication Failed");
        setKeycloakInitialized(true);
      });
    } else {
      setKeycloakInitialized(true);
    }
  }, []);


  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
        <Routes>
            <Route path="/" element={<PrivateRoute><Home kc={kc} /></PrivateRoute>} />
            <Route path="/keycloak" element={<PrivateRoute><KeycloakButton kc={kc} /></PrivateRoute>} />
        </Routes>
    </Router>
  );
}

export default App;
