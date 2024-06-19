import React from 'react';
import Header from './Header';
import FileTree from './FileTree';
import Footer from './Footer';

function Home() {
  return (
    <>
      <Header/>
      <div className="home-container">
        <div className="content">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">Ce site mènera bientôt vers un serveur super sécurisé !</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
        <div className="file-tree">
          <FileTree/>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
