import React, { useState } from 'react';
import './styles/App.css'; // Assurez-vous que le fichier de style est bien importé.

function App() {
  const [view] = useState('home');

  const goToLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  if (view === 'login') {
    return (
      <div className="App">
        <div className="content">
          <h1>Page de connexion</h1>
          <p>Ceci est la page de connexion.</p>
          <button onClick={() => goToLogin}>Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Bienvenue sur ma page</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHZgbvn53s27-hFfGazuaQuuZ9mn47_rAVsQ&s" alt="placeholder" />
        <button onClick={goToLogin}>Se connecter</button>
      </div>
    </div>
  );
}

export default App;
