import React from 'react';

function NotAuth() {
  return (
    <>
      <h1 className="display-4">You're not registered in the database</h1>
      <a className="btn btn-primary btn-lg" href="#" role="button">Ask for help</a>
    </>
  );
}

export default NotAuth;
