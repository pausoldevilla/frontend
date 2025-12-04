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
      <div className="p-6 max-w-[1200px] mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          Categorías
        </h1>

        <div className="flex overflow-x-auto space-x-6 pb-4">
          {categorias.map((cat, i) => (
            <a
              key={i}
              href={`/categoria/${cat.nombre.toLowerCase()}`}
              className="group flex-none w-64 md:w-72 lg:w-80 overflow-hidden flex flex-col transition-transform duration-200 hover:shadow-lg cursor-pointer"
            >
              <div className="overflow-hidden bg-[#ede3ca] h-64 md:h-72 lg:h-80">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-lg font-semibold mb-2 transition-all duration-200 group-hover:underline">
                  {cat.nombre}
                </h2>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto mt-12">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">
          Productos Destacados
        </h1>

        <div className="flex overflow-x-auto space-x-6 pb-4">
          {productos.map((producto) => (
            <a
              key={producto._id}
              href={`/producto/${producto._id}`}
              className="group flex-none w-64 md:w-72 lg:w-80 overflow-hidden flex flex-col transition-transform duration-200 hover:shadow-lg cursor-pointer"
            >
              <div className="overflow-hidden bg-[#ede3ca] h-64 md:h-72 lg:h-80">
                <img
                  src={producto.imatge}
                  alt={producto.nom}
                  className="w-full h-full object-contain p-5 transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <h2 className="text-lg font-semibold mb-2 transition-all duration-200 group-hover:underline">
                  {producto.nom}
                </h2>
                <p className="text-base font-bold text-black">{producto.preu} €</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
