import React from 'react';
import logo from '../assets/logo.svg';
import goToUpload from './FileUpload';

function Header({kc, redirectUri}) {
  return (
    <header className="bg-light p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" width="50" height="50" />
        </a>
        <div>
          <a href="http://localhost:3000/upload"><button className="btn btn-primary mx-2">Administrer</button></a>
          <button className="btn btn-primary mx-2">Test</button>
          <button className="btn btn-danger mx-2" onClick={() => { kc.logout({ redirectUri: redirectUri }) }}>Déconnexion</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
