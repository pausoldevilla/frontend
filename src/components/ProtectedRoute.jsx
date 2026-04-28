import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    
    const authToken = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('currentUserData') || 'null');

    // Se asume que el objeto userData guardado en localStorage tiene una propiedad 'rol'
    // Si no está, podemos intentar obtenerlo de un contexto o volver a fetch.
    // Pero por simplicidad en esta sesión, usaremos lo que hay en localStorage.
    
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
