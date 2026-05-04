import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    
    const authToken = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('currentUserData') || 'null');

    
    if (!authToken) {
        // Redirigir a login si no hay token
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && (!userData || !allowedRoles.includes(userData.rol))) {
        // Redirigir a la home o mostrar "Acceso denegado" si el rol no es el adecuado
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
