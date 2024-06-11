// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'; // Assurez-vous que le fichier de style est bien importé.

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Bienvenue sur ma page</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHZgbvn53s27-hFfGazuaQuuZ9mn47_rAVsQ&s" alt="placeholder" />
        <button onClick={handleClick}>Cliquez-moi</button>
      </div>
    </div>
  );
}

export default Home;
