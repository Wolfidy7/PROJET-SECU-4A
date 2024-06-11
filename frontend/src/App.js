import React, { useState } from 'react';
import './styles/App.css'; // Assurez-vous que le fichier de style est bien importé.

function App() {
  const [view, setView] = useState('home');

  const goToLogin = () => {
    setView('login');
  };

  if (view === 'login') {
    return (
      <div className="App">
        <div className="content">
          <h1>Page de connexion</h1>
          <p>Ceci est la page de connexion.</p>
          <button onClick={() => setView('home')}>Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Bienvenue sur ma page</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHZgbvn53s27-hFfGazuaQuuZ9mn47_rAVsQ&s" alt="placeholder" />
        <button onClick={goToLogin}>Cliquez-moi</button>
      </div>
    </div>
  );
}

export default App;
