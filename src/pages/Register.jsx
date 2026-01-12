import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PAISOS = ['Espanya', 'França', 'Itàlia', 'Portugal', 'Alemanya', 'Regne Unit', 'Estats Units'];
const PREFIXOS = ['+34', '+33', '+39', '+351', '+49', '+44', '+1'];

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [confirmContrasenya, setConfirmContrasenya] = useState('');

    const [titol, setTitol] = useState('Sr.');
    const [dataNaixement, setDataNaixement] = useState('');
    const [prefixTelefon, setPrefixTelefon] = useState('+34');
    const [telefon, setTelefon] = useState('');
    const [carrer, setCarrer] = useState('');
    const [ciutat, setCiutat] = useState('');
    const [codiPostal, setCodiPostal] = useState('');
    const [pais, setPais] = useState('Espanya');

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_URL = 'http://localhost:3000/api/usuari/registro';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (contrasenya !== confirmContrasenya) {
            setError("Las contraseñas no coinciden. Por favor, verifica.");
            return;
        }

        const telefonComplet = telefon ? `${prefixTelefon} ${telefon}` : undefined;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: name,
                    titol,
                    email,
                    contrasenya,
                    dataNaixement: dataNaixement || undefined,
                    telefon: telefonComplet,
                    adreca: {
                        carrer,
                        ciutat,
                        codiPostal,
                        pais
                    }
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registro exitoso:", data);

                alert("¡Registro exitoso! Ya puedes iniciar sesión.");
                navigate('/login');

            } else {
                console.error("Error en el registro:", data);
                setError(data.message || "Error al registrar el usuario. Inténtalo de nuevo.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("No se pudo conectar con el servidor para registrar el usuario.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50"
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
                    className="absolute top-0 left-8 md:left-10 text-gray-400 hover:text-black flex items-center gap-2 uppercase text-[10px] tracking-[0.3em] font-medium transition-colors"
                >
                    ← Inicio
                </button>

                <div className="logo font-serif font-bold text-3xl tracking-wider flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="flex flex-col items-center text-black no-underline">
                        <img src="img/logo.png" className="w-20 h-20" alt="Logo" />
                        soldevilla
                    </Link>
                </div>
                <p className="text-3xl font-medium tracking-tight text-gray-800 mt-4 mb-2 text-left">Únete a nuestra comunidad</p>
                <p className="text-lg text-gray-600 mt-4 mb-2 text-left">Crea tu cuenta para acceder a todas las funcionalidades.</p>
                {error && (
                    <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 border border-red-300">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex space-x-4">
                        <div className="w-1/4">
                            <label htmlFor="titol" className="block text-sm font-medium text-gray-700 mb-2">Titulo</label>
                            <select
                                id="titol"
                                name="titol"
                                value={titol}
                                onChange={(e) => setTitol(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300"
                            >
                                <option>Sr.</option>
                                <option>Sra.</option>
                                <option>Srta.</option>
                            </select>
                        </div>

                        <div className="w-3/4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300"
                                placeholder="Tu nombre y apellido"
                            />
                        </div>
                    </div>

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

                    <div className="flex space-x-4">
                        <div className="w-1/4">
                            <label
                                htmlFor="prefix-telefon"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Prefijo
                            </label>
                            <select
                                id="prefix-telefon"
                                name="prefixTelefon"
                                value={prefixTelefon}
                                onChange={(e) => setPrefixTelefon(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 "
                            >
                                {PREFIXOS.map(prefix => (
                                    <option key={prefix} value={prefix}>{prefix}</option>
                                ))}
                            </select>
                        </div>

                        {/* Camp de Telèfon (adaptat a la resta d'espai) */}
                        <div className="w-3/4">
                            <label
                                htmlFor="telefon"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Número
                            </label>
                            <input
                                id="telefon"
                                name="telefon"
                                type="tel"
                                autoComplete="tel-national"
                                value={telefon}
                                onChange={(e) => setTelefon(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 "
                                placeholder="600123456"
                            />
                        </div>

                    </div>
                    <div>

                        <label
                            htmlFor="dataNaixement"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Fecha de Nacimiento
                        </label>
                        <input
                            id="dataNaixement"
                            name="dataNaixement"
                            type="date"
                            value={dataNaixement}
                            onChange={(e) => setDataNaixement(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300" />
                    </div>


                    <p className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Dirección</p>


                    <div>
                        <label htmlFor="carrer" className="block text-sm font-medium text-gray-700 mb-2">Calle y Número </label>
                        <input
                            id="carrer"
                            name="carrer"
                            type="text"
                            autoComplete="street-address"
                            value={carrer}
                            onChange={(e) => setCarrer(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 "
                            placeholder="Ex: Calle Gran, 15, 3r 2a"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-2/3">
                            <label htmlFor="ciutat" className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                            <input
                                id="ciutat"
                                name="ciutat"
                                type="text"
                                autoComplete="address-level2"
                                value={ciutat}
                                onChange={(e) => setCiutat(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 "
                                placeholder="Ex: Barcelona"
                            />
                        </div>

                        <div className="w-1/3">
                            <label htmlFor="codiPostal" className="block text-sm font-medium text-gray-700 mb-2">Codigo Postal</label>
                            <input
                                id="codiPostal"
                                name="codiPostal"
                                type="text"
                                autoComplete="postal-code"
                                value={codiPostal}
                                onChange={(e) => setCodiPostal(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 "
                                placeholder="08001"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-2">País</label>
                        <select
                            id="pais"
                            name="pais"
                            autoComplete="country-name"
                            value={pais}
                            onChange={(e) => setPais(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 "
                        >
                            {PAISOS.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-xl font-semibold text-gray-800 pt-4 border-t mt-6">Contraseña</p>

                    <div>
                        <label htmlFor="contrasenya" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                        <input
                            id="contrasenya"
                            name="contrasenya"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={contrasenya}
                            onChange={(e) => setContrasenya(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 "
                            placeholder="Crea una contraseña segura"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-contrasenya" className="block text-sm font-medium text-gray-700 mb-2">Repetir Contraseña</label>
                        <input
                            id="confirm-contrasenya"
                            name="confirm_contrasenya"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={confirmContrasenya}
                            onChange={(e) => setConfirmContrasenya(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 "
                            placeholder="Repite la contraseña"
                        />
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-lg font-semibold text-white bg-gray-900 hover:bg-black transition duration-150"
                        >
                            Registrarme
                        </button>
                    </div>
                </form>

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