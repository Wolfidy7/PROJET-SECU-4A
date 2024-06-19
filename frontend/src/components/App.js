import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../styles/App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import '/node_modules/primeflex/primeflex.css'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { httpClient } from './HttpClient';
import Keycloak from 'keycloak-js';
import Home from './Home';
import FileTree from './FileTree';

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

  const callBackend = () => {
    httpClient.get('https://mockbin.com/request');
  };

  const redirectUri = window.location.origin;

  if (!keycloakInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <div className='grid'>
          <div className='col-12'>
            <h1>My Secured React App</h1>
          </div>
        </div>
        <div className="grid">
        </div>

        <div className='grid'>
          <div className='col-1'></div>
          <div className='col-2'>
            <div className="col">
              <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}
                className="m-1 custom-btn-style"
                label='Is Authenticated' />

              <Button onClick={() => { setInfoMessage(kc.login().toString() )}}
                className='m-1 custom-btn-style'
                label='Login'
                severity="success" />

              {/* <Button onClick={() => { setInfoMessage(kc.token) }}
                className="m-1 custom-btn-style"
                label='Show Access Token'
                severity="info" />

              <Button onClick={() => { setInfoMessage(JSON.stringify(kc.tokenParsed)) }}
                className="m-1 custom-btn-style"
                label='Show Parsed Access token'
                severity="warning" />

              <Button onClick={() => { setInfoMessage(kc.isTokenExpired(5).toString()) }}
                className="m-1 custom-btn-style"
                label='Check Token expired'
                severity="info" />

              <Button onClick={() => { kc.updateToken(10).then((refreshed) => { setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e) => { setInfoMessage('Refresh Error') }) }}
                className="m-1 custom-btn-style"
                label='Update Token (if about to expire)' />

              <Button onClick={callBackend}
                className='m-1 custom-btn-style'
                label='Send HTTP Request'
                severity="success" />

              <Button onClick={() => { kc.logout({ redirectUri: redirectUri }) }}
                className="m-1 custom-btn-style"
                label='Logout'
                severity="danger" /> */}
                

              <Button onClick={() => { setInfoMessage(kc.hasRealmRole('admin').toString()) }}
                className="m-1 custom-btn-style"
                label='has realm role "Admin"'
                severity="info" />

              <Button onClick={() => { setInfoMessage(kc.hasResourceRole('test').toString()) }}
                className="m-1 custom-btn-style"
                label='has client role "test"'
                severity="info" />
            </div>
          </div>
          <div>
    <h1>File Explorer</h1>
    <FileTree />
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

        <Routes>
          <Route path="/test" element={<Home />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
