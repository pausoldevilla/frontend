// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

export default function Register() {
  // 1. Estados para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState(''); // Usamos 'contrasenya' para consistencia con el backend
  const [confirmContrasenya, setConfirmContrasenya] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();
  
  // URL absoluta de la API (misma base que el login)
  const API_URL = 'http://localhost:3000/api/usuari/registro';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 2. Validaciones básicas en el cliente
    if (contrasenya !== confirmContrasenya) {
      setError("Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    try {
      // 3. Enviar solicitud POST al backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nom: name, // El backend espera 'nom'
          email, 
          contrasenya // El backend espera 'contrasenya'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 4. Registro exitoso
        console.log("Registro exitoso:", data);
        
        // Opcional: Podrías redirigir al login o iniciar sesión automáticamente
        alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        navigate('/login'); 

      } else {
        // 5. Error del servidor (ej. el email ya existe, validación fallida)
        console.error("Error en el registro:", data);
        setError(data.message || "Error al registrar el usuario. Inténtalo de nuevo.");
      }
    } catch (err) {
      // 6. Captura errores de red (si fallara CORS o el servidor estuviera apagado, aunque ya lo arreglamos)
      console.error("Error de red:", err);
      setError("No se pudo conectar con el servidor para registrar el usuario.");
    }
  };

  return (
    // Versión con fondo plano
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      {/* Tarjeta del Formulario */}
      <div className="w-full max-w-md p-8 md:p-10 relative">

        {/* Logo y texto del logo */}
        <div className="logo font-serif font-bold text-3xl tracking-wider flex flex-col items-center justify-center mb-8">
          <Link to="/" className="flex flex-col items-center text-black no-underline">
            <img src="img/logo.png" className="w-20 h-20" alt="Logo" />
            soldevilla
          </Link>
        </div>

        {/* Título de Bienvenida */}
        <p className="text-2xl text-gray-800 mt-4 mb-2 text-left">
          Únete a nuestra comunidad
        </p>

        {/* Párrafo de introducción */}
        <p className="text-lg text-gray-600 mt-4 mb-2 text-left">
          Crea tu cuenta para acceder a todas las funcionalidades.
        </p>
        
        {/* Mensaje de Error */}
        {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md border border-red-300">
                {error}
            </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Campo de Nombre */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={name} // 👈 Conectar estado
              onChange={(e) => setName(e.target.value)} // 👈 Manejar cambio
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Tu nombre y apellido"
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email} // 👈 Conectar estado
              onChange={(e) => setEmail(e.target.value)} // 👈 Manejar cambio
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="tu@correo.com"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label
              htmlFor="contrasenya"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              id="contrasenya"
              name="contrasenya"
              type="password"
              required
              autoComplete="new-password"
              value={contrasenya} // 👈 Conectar estado
              onChange={(e) => setContrasenya(e.target.value)} // 👈 Manejar cambio
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Crea una contraseña segura"
            />
          </div>
          
          {/* Campo Repetir Contraseña */}
          <div>
            <label
              htmlFor="confirm-contrasenya"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Repetir Contraseña
            </label>
            <input
              id="confirm-contrasenya"
              name="confirm_contrasenya"
              type="password"
              required
              autoComplete="new-password"
              value={confirmContrasenya} // 👈 Conectar estado
              onChange={(e) => setConfirmContrasenya(e.target.value)} // 👈 Manejar cambio
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Repite la contraseña"
            />
          </div>

          {/* Botón de Submit */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Registrarme
            </button>
          </div>
        </form>

        {/* Enlace de Login */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-red-600 hover:text-red-500 hover:underline"
            >
              Inicia Sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}