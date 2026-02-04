import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const API_URL = 'http://localhost:3000/api/usuari/login';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasenya }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }

      const apiResponse = await response.json();

      const loginData = apiResponse.data;

      const authToken = loginData.accessToken || loginData.token || loginData.refreshToken;

      if (!authToken) {
        throw new Error("El servidor no ha retornat cap token vàlid.");
      }

      localStorage.setItem('authToken', authToken);

      navigate('/');

    } catch (err) {
      console.error("Fallo en la autenticación:", err.message);

      setError(err.message === "Failed to fetch"
        ? "Error de conexión con el servidor. ¿Está el backend activo?"
        : err.message
      );
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url('/img/bg-form.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}>
      <div className="w-full max-w-md p-8 md:p-10 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-0 left-8 md:left-10 text-gray-400 hover:text-black flex items-center gap-2 uppercase text-[10px] tracking-[0.3em] font-medium transition-colors border-b border-transparent hover:border-black pb-1"
        >
          ← Inicio
        </button>

        <div className="logo font-serif font-bold text-3xl tracking-wider flex flex-col items-center justify-center mb-8">
          <Link to="/" className="flex flex-col items-center text-black no-underline">
            <img src="img/logo.png" className="w-20 h-20" alt="Logo" />
            soldevilla
          </Link>
        </div>

        <p className="text-2xl font-medium uppercase tracking-[0.2em] text-gray-800 mt-4 mb-4 text-left">
          Iniciar Sesión
        </p>
        <p className="text-base text-gray-600 mb-8 text-left font-light leading-relaxed">
          Introduce tus credenciales para continuar.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 border border-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300"
              placeholder="tu@correo.com"
            />
          </div>

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
              autoComplete="current-password"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-5 px-4 text-white bg-black hover:bg-gray-800 transition-all uppercase text-[11px] tracking-[0.3em] font-medium"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="font-medium text-red-600 hover:text-red-500 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}