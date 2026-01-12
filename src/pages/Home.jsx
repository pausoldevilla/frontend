import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
        if (data.status === "success" && Array.isArray(data.data)) {
          setProductos(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="p-6 text-lg text-center">Cargando productos...</p>;

  if (!productos || productos.length === 0)
    return (
      <div className="p-6 text-center">
        <p className="text-lg mb-4">No hay productos disponibles.</p>
        {process.env.NODE_ENV === "development" && (
          <pre className="bg-gray-200 p-4 overflow-x-auto">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        )}
      </div>
    );

  const categorias = [
    { nombre: "Interior", imagen: "img/interior.png" },
    { nombre: "Exterior", imagen: "img/exterior.png" },
    { nombre: "Suculentas", imagen: "img/suculentas.png" },
    { nombre: "Florales", imagen: "img/florales.png" },
  ];

  return (
    <>
      <NavBar />
      <Hero />
      <div id="categories" className="pt-16 pb-12 px-6 max-w-[1400px] mx-auto">
        <h1 className="text-left text-xl md:text-2xl font-medium mb-16 uppercase tracking-widest pl-2">
          Categorías
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categorias.map((cat, i) => (
            <Link
              key={i}
              to={`/categoria/${cat.nombre.toLowerCase()}`}
              className="group w-full flex flex-col cursor-pointer text-black no-underline"
            >
              <div className="overflow-hidden bg-[#ede3ca] mb-4 relative aspect-[3/4]">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="text-left pl-2">
                <h2 className="text-sm uppercase tracking-[0.2em] font-medium hover:underline transition-colors decoration-gray-900 underline-offset-4">
                  {cat.nombre}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-0 pb-24 px-6 max-w-[1400px] mx-auto">
        <h1 className="text-left text-xl md:text-2xl font-medium mb-16 uppercase tracking-widest pl-2">
          Productos Destacados
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {productos.map((producto) => (
            <Link
              key={producto._id}
              to={`/producto/${producto._id}`}
              className="group w-full flex flex-col cursor-pointer text-black no-underline"
            >
              <div className="relative overflow-hidden bg-[#ede3ca] aspect-[3/4] mb-6">
                <img
                  src={producto.imatge}
                  alt={producto.nom}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 ease-out transform group-hover:scale-105 mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col items-start text-left gap-2 pl-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest">{producto.categoria}</p>
                <h2 className="text-lg font-medium tracking-wide hover:underline transition-colors decoration-gray-900 underline-offset-4">
                  {producto.nom}
                </h2>
                <p className="text-base font-light text-gray-900 mt-1">{producto.preu} €</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
