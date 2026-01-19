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
      <div className="py-24 px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="pl-2 md:col-start-2">
          <h1 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
            Cultivando momentos de tranquilidad y belleza natural.
          </h1>
          <p className="text-gray-600 leading-relaxed font-light text-lg">
            En nuestro vivero, creemos que cada planta cuenta una historia. Nos dedicamos a seleccionar meticulosamente los mejores ejemplares para que puedas crear espacios llenos de vida y armonía. Ya sea que busques purificar el aire de tu oficina o dar un toque vibrante a tu jardín, nuestra pasión es conectarte con la naturaleza de la forma más pura y sencilla.
          </p>
        </div>
      </div>



      <div className="pt-0 pb-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-16 px-2">
          <div>
            <h1 className="text-left text-xl md:text-2xl font-medium uppercase tracking-widest mb-4">
              Productos Destacados
            </h1>
            <p className="text-gray-500 font-light max-w-xl">
              Una cuidada selección de nuestras plantas favoritas, listas para transformar tu hogar en un refugio natural.
            </p>
          </div>
          <Link to="/search" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            Ver mas
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x cursor-grab active:cursor-grabbing px-2">
          {productos.map((producto) => (
            <div key={producto._id} className="flex-shrink-0 w-[75%] sm:w-[45%] lg:w-[23%] snap-start">
              <Link
                to={`/producto/${producto._id}`}
                className="group w-full flex flex-col cursor-pointer text-black no-underline"
              >
                <div className="relative overflow-hidden bg-[#ede3ca] aspect-[3/4] mb-6">
                  <img
                    src={producto.imatge}
                    alt={producto.nom}
                    className="w-full h-full object-contain p-8 mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col items-start text-left gap-2 pl-2">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{producto.categoria}</p>
                  <h2 className="text-lg font-medium tracking-wide hover:underline decoration-gray-900 underline-offset-4">
                    {producto.nom}
                  </h2>
                  <p className="text-base font-light text-gray-900 mt-1">{producto.preu} €</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="py-24 px-6 max-w-[1400px] mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 overflow-hidden bg-[#ede3ca] aspect-[4/3] relative">
            <img
              src="/img/nosotros.png"
              alt="Interiorismo botánico"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="md:col-span-5 pt-8 md:pt-16">
            <h2 className="text-3xl font-medium mb-8 uppercase tracking-widest">Nuestra Visión</h2>
            <p className="text-lg font-light text-gray-600 leading-relaxed mb-10">
              Buscamos el equilibrio entre la arquitectura moderna y la naturaleza.
              Creemos que el diseño no termina en el mobiliario, sino en la vida que crece a su alrededor.
              Nuestra labor transforma casas en hogares.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium group decoration-gray-400 transition-all duration-300"
            >
              <span>Conoce nuestra historia</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div id="categories" className="py-24 px-6 max-w-[1400px] mx-auto border-t border-gray-100">
        <div className="mb-16">
          <h1 className="text-left text-xl md:text-2xl font-medium uppercase tracking-widest mb-4 pl-2">
            Categorías
          </h1>
          <p className="text-gray-500 font-light pl-2 max-w-xl">
            Explora nuestras colecciones diseñadas para cada tipo de ambiente y jardinero. Desde lo más resistente hasta lo más exótico.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categorias.map((cat, i) => (
            <Link
              key={i}
              to={`/categoria/${cat.nombre.toLowerCase()}`}
              className="group w-full flex flex-col cursor-pointer text-black no-underline"
            >
              <div className="overflow-hidden mb-6 relative aspect-[3/4]">
                <img
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left pl-2">
                <h2 className="text-lg font-medium tracking-wide hover:underline decoration-gray-900 underline-offset-4">
                  {cat.nombre}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 flex flex-col justify-center h-full order-2 md:order-1">
            <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium mb-6">El Proceso</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium tracking-tight mb-2">Curaduría Vegetal</h4>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  Seleccionamos cada ejemplar por su carácter y adaptabilidad, asegurando una evolución natural del espacio.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium tracking-tight mb-2">Diseño Estructural</h4>
                <p className="text-sm font-light text-gray-600 leading-relaxed">
                  Creamos armonía entre los elementos arquitectónicos y el crecimiento orgánico de las plantas.
                </p>
              </div>
            </div>
            <Link
              to="/jardines"
              className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium group decoration-gray-400 transition-all duration-300"
            >
              <span>Ver proyectos de paisajismo</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
          <div className="md:col-span-8 overflow-hidden bg-[#ede3ca] aspect-[16/9] relative group order-1 md:order-2">
            <img
              src="/img/jardin.jpg"
              alt="Diseño de Jardines"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="py-24 px-6 max-w-[1400px] mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="w-full md:col-span-7 h-full min-h-[300px] bg-gray-200 relative aspect-[4/3] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.636603248881!2d2.1074853!3d41.5454486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a494e330555555%3A0x1234567890abcdef!2sCarrer%20de%20Girona%2C%20208%2C%2008203%20Sabadell%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1600000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Store"
              className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
          <div className="md:col-span-5 pt-8 md:pt-16">
            <h2 className="text-3xl font-medium mb-8 uppercase tracking-widest">Contacto</h2>
            <p className="text-lg font-light text-gray-600 leading-relaxed mb-6">
              Nos encantaría recibirte en nuestro espacio. Un refugio verde en el centro de la ciudad donde inspirarte.
            </p>
            <div className="space-y-4 text-sm font-light text-gray-600 mb-10">
              <div>
                <p className="font-medium text-gray-900 uppercase text-xs tracking-wider mb-1">Visítanos</p>
                <p>Carrer de Girona 208</p>
                <p>08203 Sabadell, Barcelona</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 uppercase text-xs tracking-wider mb-1">Contacto</p>
                <p>info.soldevilla@gmail.com</p>
                <p>+34 900 123 456</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 uppercase text-xs tracking-wider mb-1">Horario</p>
                <p>Lunes - Viernes: 10:00 - 20:00</p>
                <p>Sábado: 11:00 - 15:00</p>
              </div>
            </div>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium group decoration-gray-400 transition-all duration-300"
            >
              <span>Mas información</span>
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
