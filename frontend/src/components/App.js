import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../styles/App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css';
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';
import Home from './Home';
import FileTree from './FileTree';
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
  const [infoMessage, setInfoMessage] = useState('');
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

  const redirectUri = window.location.origin;

  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
                <Routes>
          <Route path="/test" element={<Home />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
        <div className='grid'>
          {/* <div className='col-12'>
            <h1>My Secured React App</h1>
          </div>
        </div>
        <div className="grid">
          <div className='col-1'></div>
          <div className='col-2'>
            <KeycloakButton kc={kc} httpClient={httpClient} redirectUri={redirectUri} setInfoMessage={setInfoMessage} />
          </div>
          <div className='col-6'>
            <Card>
              <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
                {infoMessage}
              </p>
            </Card>
          </div>
          <div className='col-2'></div>
        </div>
        <div>
          <h1>File Explorer</h1> */}
          <FileTree kc={kc} />
        </div>

      </div>
    </Router>
  );
}

export default App;
