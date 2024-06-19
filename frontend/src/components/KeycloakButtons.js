import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const KeycloakButton = ({ kc, httpClient, redirectUri }) => {
  const [infoMessage, setInfoMessage] = useState('');

  const callBackend = () => {
    httpClient.get('https://mockbin.com/request');
  };

  return (
    <div>
      <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE') }}
        className="m-1 custom-btn-style"
        label='Is Authenticated' />

      <Button onClick={() => { setInfoMessage(kc.login().toString() )}}
        className='m-1 custom-btn-style'
        label='Login'
        severity="success" />

      <Button onClick={() => { setInfoMessage(kc.hasRealmRole('admin').toString()) }}
        className="m-1 custom-btn-style"
        label='has realm role "Admin"'
        severity="info" />

      <Button onClick={() => { setInfoMessage(kc.hasResourceRole('test').toString()) }}
        className="m-1 custom-btn-style"
        label='has client role "test"'
        severity="info" />
      
      <Button onClick={callBackend}
        className='m-1 custom-btn-style'
        label='Send HTTP Request'
        severity="success" />

      <Button onClick={() => { kc.logout({ redirectUri: redirectUri }) }}
        className="m-1 custom-btn-style"
        label='Logout'
        severity="danger" />

      <div className='col-6'>
            <Card>
              <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
                {infoMessage}
              </p>
            </Card>
      </div>
      <div className='col-2'></div>
    </div>
    
  );
};

export default KeycloakButton;
