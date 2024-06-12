import React from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Ou une autre logique pour vérifier l'authentification

    if (!isAuthenticated) {
        // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
