import React from 'react';
import Header from './Header';

function Home() {
  return (
    <>
    <Header/>
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">Ce site mènera bientôt vers un serveur super sécurisé !</p>
      <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </>
  );
}

export default Home;
