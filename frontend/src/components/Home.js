import React from 'react';
import Header from './Header';
import FileTree from './FileTree';
import Footer from './Footer';

function Home({ kc }) {
  return (
    <>
      <Header />
      <div className="home-container container my-5">
        <div className="content text-center mb-5">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">Ce site mènera bientôt vers un serveur super sécurisé !</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
        <div className="file-tree text-center">
          <FileTree kc={kc} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
