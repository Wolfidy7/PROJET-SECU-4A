import React from 'react';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="bg-light p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" width="50" height="50" />
        </a>
        <div>
          <button className="btn btn-primary mx-2">Administrer</button>
          <button className="btn btn-primary mx-2">Test</button>
          <button className="btn btn-danger">Déconnexion</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
