import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthHandler = () => {
    const navigate = useNavigate(); // Modifie 'history' en 'navigate' pour plus de clarté

    React.useEffect(() => {
        axios.get('http://localhost:3000/login?iss=http://172.17.0.1:8080/realms/myrealm') // Assure-toi que cette URL est correcte
            .then(response => {
                const login = response.data.login;
                localStorage.setItem('login', login);
                navigate('/header'); // Utilise 'navigate' au lieu de 'history.push'
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du login', error);
            });
    }, [navigate]); // Ici aussi, assure-toi d'utiliser 'navigate'

    return <div>Chargement...</div>;
};

export default AuthHandler;
