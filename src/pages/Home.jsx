import React, { useEffect, useState } from "react";

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
          <pre className="bg-gray-200 p-4 rounded overflow-x-auto">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        )}
      </div>
    );

  // Lista fija de categorías
  const categorias = [
    { nombre: "Interior", imagen: "img/interior.png" },
    { nombre: "Exterior", imagen: "img/exterior.png" },
    { nombre: "Suculentas", imagen: "img/suculentas.png" },
    { nombre: "Florales", imagen: "img/florales.png" },
  ];

  return (
    <>
          {/* Categorías */}
      <div className="p-6 max-w-[1200px] mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          Categorías
        </h1>

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {categorias.map((cat, i) => (
            <div
              key={i}
              className="overflow-hidden flex flex-col transition-transform duration-200 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className=" h-[400px] w-full  bg-[#ede3ca] transition-transform duration-300 transform hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold mb-2">{cat.nombre}</h2>
                </div>

                <button className="mt-4 py-2 bg-[#e5c546] text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[#95802d]">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Productos Destacados */}
      <div className="p-6 max-w-[1200px] mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          Productos Destacados
        </h1>

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="overflow-hidden flex flex-col transition-transform duration-200 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={producto.imatge}
                  alt={producto.nom}
                  className="p-5 h-[400px] w-full object-contain bg-[#ede3ca] transition-transform duration-300 transform hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold mb-2">{producto.nom}</h2>
                  <p className="text-base font-bold text-black">
                    {producto.preu} €
                  </p>
                </div>

                <button className="mt-4 py-2 bg-[#e5c546] text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[#95802d]">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
