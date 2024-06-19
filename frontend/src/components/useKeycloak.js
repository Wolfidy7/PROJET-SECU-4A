import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://172.17.0.1:8080/',
  realm: 'myrealm',
  clientId: 'myclient',
}

const keycloak = new Keycloak(initOptions);

const useKeycloak = () => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256'
    }).then((auth) => {
      setAuthenticated(auth);
      if (!auth) {
        window.location.reload();
      } else {
        console.info("Authenticated");
        setKeycloakInitialized(true);
      }
    }).catch(() => {
      console.error("Authentication Failed");
      setKeycloakInitialized(true);
    });

    keycloak.onTokenExpired = () => {
      console.log('token expired');
      keycloak.updateToken(10).catch(() => {
        keycloak.login();
      });
    };
  }, []);

  return { keycloak, keycloakInitialized, authenticated };
};

export default useKeycloak;
