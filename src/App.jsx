import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logoImage from "./assets/vivero-camuendo.jpg";
import facebookLogo from "../imag_logo/Facebook_Logo.png";
import whatsappLogo from "../imag_logo/WhatsApp_logo.png";
import instagramLogo from "../imag_logo/instagram-logo.png";
import sanpabloImage from "../imag_logo/sanpablo.png";
import { categoryData } from "./catalog.js";

const serviceData = [
  {
    title: "Planificación y diseño",
    subtitle: "Jardines funcionales y sostenibles",
    description: "Creamos espacios verdes desde cero con propuestas personalizadas, planificación por etapas y selección estratégica de plantas.",
    bullets: ["Diseño personalizado residencial o comercial", "Propuestas visuales y etapas claras", "Selección según clima y suelo", "Optimización del espacio"],
  },
  {
    title: "Implementación y desarrollo",
    subtitle: "Ejecutamos con técnica y estilo",
    description: "Convertimos el diseño en realidad con instalación cuidada, riego eficiente y detalles que mantienen la armonía del proyecto.",
    bullets: ["Preparación de terreno", "Instalación de plantas y césped", "Sistemas de riego eficientes", "Huertos urbanos funcionales"],
  },
  {
    title: "Mantenimiento continuo",
    subtitle: "Cuidado que protege tu inversión",
    description: "Ofrecemos mantenimiento regular para mantener la salud, belleza y rendimiento de cada planta y cada área verde.",
    bullets: ["Podas programadas", "Control de plagas y enfermedades", "Fertilización y suelo sano", "Supervisión periódica"],
  },
  {
    title: "Asesoría y acompañamiento",
    subtitle: "Apoyo profesional en cada decisión",
    description: "Brindamos recomendaciones técnicas claras y planes de mejora para que tu jardín evolucione con seguridad.",
    bullets: ["Evaluación del jardín actual", "Recomendaciones personalizadas", "Planes de mejora y renovación", "Apoyo continuo durante el proyecto"],
  },
];

const posts = [
  {
    title: "La agricultura urbana crece en Ecuador",
    excerpt: "Proyectos de huertos caseros y jardines de balcón se popularizan como alternativa sostenible y educativa.",
    source: "Revista EcoVivero",
    date: "Jun 2026",
    image: "https://images.unsplash.com/photo-1524594154901-4874c192f089?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Menta y manzanilla: aliados en el hogar",
    excerpt: "Estudios recientes confirman que estas plantas ayudan a purificar el aire y reducir el estrés en espacios interiores.",
    source: "Avances Botánicos",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Herbología ancestral para tu jardín",
    excerpt: "Sabiduría local recomienda usar ruda y toronjil en jardines para equilibrar energía y proteger cultivos.",
    source: "Herbología Viva",
    date: "Jun 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Plantas nativas impulsan la reforestación",
    excerpt: "Viveros y comunidades se unen para promover especies autóctonas que restauran suelos y biodiversidad.",
    source: "Periódico Verde",
    date: "Jun 2026",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80",
  },
];

function HomePage({
  navigateToPage,
  activeServiceIndex,
  setActiveServiceIndex,
  serviceHover,
  setServiceHover,
  handleServicePointerDown,
  handleServicePointerMove,
  handleServicePointerUp,
  prevService,
  nextService,
  goToService,
  activeTopProductIndices,
  topProductHovers,
  handleTopProductHover,
  handleTopProductPointerDown,
  handleTopProductPointerMove,
  handleTopProductPointerUp,
  prevTopProduct,
  nextTopProduct,
  goToTopProduct,
  handleAddToCart,
  topProducts,
}) {
  const visibleTopProducts = activeTopProductIndices.map((index) => topProducts[index % topProducts.length]);

  return (
    <>
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">Jardinería y bienestar natural</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">Plantas, huertos y jardines para transformar tu espacio</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">Creamos experiencias verdes para hogares, oficinas y proyectos comerciales. Descubre productos, promociones y servicios con navegación interna para explorar sin exceso de scroll.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => navigateToPage("catalog")} className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">Ver catálogo</button>
              <a href="#contacto" className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-700 hover:text-emerald-700">Solicitar información</a>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-100/50">
            <div className="aspect-[4/3] rounded-2xl bg-[linear-gradient(135deg,#d1fae5,#ecfccb,#ffffff)]" />
          </div>
        </div>
      </section>

      <section id="mas-vendido" className="bg-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Lo más vendido</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Productos con más interacción</h2>
            <p className="mt-4 text-zinc-600">Promocionamos los productos que los usuarios más consultan y eligen, para destacar lo mejor de nuestro catálogo.</p>
          </div>

          <div className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-100 group relative overflow-hidden">
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleTopProducts.map((product, index) => (
                <div 
                  key={`${product.title}-${index}`} 
                  className="rounded-3xl border border-zinc-200 bg-emerald-50 p-5 shadow-sm transition-all duration-1000 ease-in-out hover:border-emerald-700 hover:shadow-md"
                  onPointerEnter={() => handleTopProductHover(index, true)}
                  onPointerLeave={() => handleTopProductHover(index, false)}
                  onPointerDown={(e) => handleTopProductPointerDown(e, index)}
                  onPointerMove={(e) => handleTopProductPointerMove(e, index)}
                  onPointerUp={(e) => handleTopProductPointerUp(e, index)}
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-4xl shadow-sm">{product.image}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{product.subtitle}</p>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-600">{product.details}</p>
                  <p className="mt-3 text-xs text-zinc-500">{product.category}</p>
                  <button type="button" onClick={() => handleAddToCart(product)} className="mt-4 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">Agregar</button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs text-zinc-500">Cada carta cambia cada 4 segundos · Pausa individual al pasar el cursor</div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Servicios</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Gestión integral para tu espacio verde</h2>
            <p className="mt-4 text-zinc-600">Ofrecemos soluciones completas de jardinería enfocadas en la planificación, cuidado y evolución de tus áreas verdes.</p>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-2 shadow-sm shadow-zinc-100">
            <div className="group relative overflow-hidden rounded-[2rem]" onPointerEnter={() => setServiceHover(true)} onPointerLeave={() => setServiceHover(false)} onPointerDown={handleServicePointerDown} onPointerMove={handleServicePointerMove} onPointerUp={handleServicePointerUp}>
              <div className="rounded-[2rem] bg-white p-10 sm:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">{serviceData[activeServiceIndex].title}</h3>
                    <p className="mt-2 text-sm font-semibold text-emerald-700">{serviceData[activeServiceIndex].subtitle}</p>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-emerald-700 shadow-sm"><span className="text-2xl">✨</span></div>
                </div>
                <p className="mt-6 text-sm leading-7 text-zinc-600">{serviceData[activeServiceIndex].description}</p>
                <ul className="mt-8 space-y-3 text-sm text-zinc-600">
                  {serviceData[activeServiceIndex].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-700" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" onClick={prevService} className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-3 text-zinc-700 shadow-lg transition duration-200 ${serviceHover ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-label="Servicio anterior">‹</button>
              <button type="button" onClick={nextService} className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-3 text-zinc-700 shadow-lg transition duration-200 ${serviceHover ? "opacity-100" : "opacity-0 pointer-events-none"}`} aria-label="Siguiente servicio">›</button>
            </div>
            <div className="mt-4 hidden justify-center gap-3 sm:flex">
              {serviceData.map((_, index) => (
                <button key={index} type="button" onClick={() => goToService(index)} className={`h-2.5 w-2.5 rounded-full transition ${activeServiceIndex === index ? "bg-emerald-700" : "bg-zinc-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Comunicados</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Explora el mundo hoy</h2>
          <p className="mt-4 text-zinc-600">Noticias actuales, datos curiosos y avances en herbología, viveros y cultivos para inspirar tu curiosidad verde.</p>
          <p className="mt-3 text-sm text-emerald-700">Actualizado periódicamente desde medios especializados, revistas verdes y avances científicos.</p>
        </div>
        <div className="mt-10 overflow-x-auto pb-6">
          <div className="flex gap-6 min-w-max px-2">
            {posts.map((post) => (
              <article key={post.title} className="min-w-[22rem] rounded-3xl bg-cover bg-center p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-2xl" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.48), rgba(15, 23, 42, 0.16)), url(${post.image})` }}>
                <div className="mb-4 flex items-center justify-between gap-4 text-xs text-emerald-100">
                  <span>{post.date}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-semibold text-white backdrop-blur">{post.source}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/85">{post.excerpt}</p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-white">Leer más →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden py-20 text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.65)), url(${sanpabloImage})` }} />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Contacto y ubicación</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Visítanos en Plaza Wayku Chupa, Camuendo</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-100">Estamos cerca del Lago San Pablo y tenemos atención permanente durante el fin de semana para que puedas planificar tu visita con tranquilidad.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-black/20 p-8 ring-1 ring-white/10 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">📍 Dirección</h3>
              <p className="mt-4 text-sm leading-7 text-emerald-100">Calle Mariscal Sucre y entrada "Wayku Chupa", Camuendo, Imbabura, Ecuador.</p>
              <p className="mt-3 text-sm leading-7 text-emerald-100">Referencia: 1 cuadra de las Cabañas del Lago, cerca del Lago San Pablo.</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Plaza+Wayku+Chupa+Camuendo+Imbabura+Ecuador" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">Ver en Maps</a>
            </div>
            <div className="rounded-3xl bg-black/20 p-8 ring-1 ring-white/10 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">🕒 Horarios</h3>
              <p className="mt-4 text-sm leading-7 text-emerald-100">Lunes a sábado: 08:00 – 17:30</p>
              <p className="mt-2 text-sm leading-7 text-emerald-100">Domingo: 10:30 – 17:30</p>
              <p className="mt-6 text-sm leading-7 text-emerald-100">Para visitas y consultas técnicas, contáctanos antes de llegar.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CatalogPage({
  navigateToPage,
  handleAddToCart,
  catalogSidebarOpen,
  setCatalogSidebarOpen,
  catalogSelectedCategory,
  setCatalogSelectedCategory,
}) {
  const catalogSelectedCategoryData = categoryData?.find((cat) => cat.name === catalogSelectedCategory);
  const catalogSelectedProducts = catalogSelectedCategoryData?.products ?? [];

  // Verificación de seguridad por si los datos no están disponibles
  if (!categoryData || categoryData.length === 0) {
    return (
      <section id="catalog-page" className="min-h-screen bg-emerald-50 py-8 text-zinc-900">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-lg text-zinc-600">Cargando catálogo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog-page" className="min-h-screen bg-emerald-50 py-8 text-zinc-900">
      {!catalogSidebarOpen && (
        <button type="button" onClick={() => setCatalogSidebarOpen(true)} className="fixed top-20 left-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-xl ring-1 ring-zinc-200 transition hover:bg-emerald-50 md:top-4" aria-label="Abrir categorías">☰</button>
      )}
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-6 px-4">
        <aside className={`fixed inset-y-0 left-0 z-50 w-[18rem] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${catalogSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Categorías</p>
              <h2 className="mt-2 text-xl font-bold text-zinc-900">Explora por tipo</h2>
            </div>
            <button type="button" onClick={() => setCatalogSidebarOpen(false)} className="rounded-full bg-zinc-100 p-2 text-zinc-700 transition hover:bg-zinc-200" aria-label="Cerrar menú">✕</button>
          </div>
          <div className="space-y-3">
            {categoryData.map((category) => (
              <button key={category.name} type="button" onClick={() => { setCatalogSelectedCategory(category.name); setCatalogSidebarOpen(false); }} className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${category.name === catalogSelectedCategory ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm" : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"}`}>{category.name}</button>
            ))}
          </div>
        </aside>
        <div className={`w-full transition-all duration-300`}>
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setCatalogSidebarOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg ring-1 ring-zinc-200 transition hover:bg-emerald-50" aria-label="Abrir categorías">☰</button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Catálogo completo</p>
                <h1 className="text-xl font-bold text-zinc-900">{catalogSelectedCategoryData?.name ?? "Categoría"}</h1>
              </div>
            </div>
            <button type="button" onClick={() => navigateToPage("home")} className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100">Volver al inicio</button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {catalogSelectedProducts.map((product) => (
              <div key={product.title} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-700 hover:shadow-md overflow-hidden">
                <div className="flex items-center justify-center h-40 bg-emerald-50 rounded-2xl mb-4">
                  <span className="text-7xl">{product.image}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{product.subtitle}</p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{product.details}</p>
                <button type="button" onClick={() => handleAddToCart(product)} className="mt-6 w-full rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">Agregar al carrito</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => (window.location.pathname === "/catalogo" ? "catalog" : "home"));
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBubblePosition, setCartBubblePosition] = useState({ right: 28, bottom: 28 });
  const [cartDragging, setCartDragging] = useState(false);
  const cartDragRef = useRef({ startX: 0, startY: 0, startRight: 28, startBottom: 28 });
  
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [serviceHover, setServiceHover] = useState(false);
  const [serviceDragging, setServiceDragging] = useState(false);
  const serviceDragRef = useRef({ startX: 0, startY: 0, startIndex: 0 });

  const [activeTopProductIndices, setActiveTopProductIndices] = useState([0, 1, 2, 3, 4, 5]);
  const [topProductHovers, setTopProductHovers] = useState([false, false, false, false, false, false]);
  const [topProductDraggings, setTopProductDraggings] = useState([false, false, false, false, false, false]);
  const topProductDragRefs = useRef(Array(6).fill().map(() => ({ startX: 0, startY: 0, startIndex: 0 })));

  const [catalogSidebarOpen, setCatalogSidebarOpen] = useState(false);
  const [catalogSelectedCategory, setCatalogSelectedCategory] = useState(categoryData[0].name);

  const whatsappNumber = "593980752799";

  // Obtener productos más vendidos
  const allProducts = categoryData.flatMap((cat) =>
    cat.products.map((prod) => ({ ...prod, category: cat.name }))
  );
  const topProducts = allProducts
    .sort((a, b) => {
      const scoreA = (a.views || 0) * 0.5 + (a.clicks || 0) * 0.35 + (a.engagement || 0) * 0.15;
      const scoreB = (b.views || 0) * 0.5 + (b.clicks || 0) * 0.35 + (b.engagement || 0) * 0.15;
      return scoreB - scoreA;
    })
    .slice(0, 8);

  const formatWhatsAppText = () => {
    if (cartItems.length === 0) return "Hola, deseo recibir información sobre sus productos y servicios de vivero.";
    const lines = ["Hola, quisiera solicitar esta lista de productos:", ...cartItems.map((item) => `- ${item.title} (${item.subtitle}) x${item.quantity}`), "", "Gracias, por favor contáctame para coordinar la compra."];
    return lines.join("\n");
  };

  const handleBubblePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setCartDragging(true);
    cartDragRef.current = { startX: event.clientX, startY: event.clientY, startRight: cartBubblePosition.right, startBottom: cartBubblePosition.bottom };
  };

  const handleBubblePointerMove = (event) => {
    if (!cartDragging) return;
    const deltaX = event.clientX - cartDragRef.current.startX;
    const deltaY = event.clientY - cartDragRef.current.startY;
    setCartBubblePosition({ right: Math.max(16, cartDragRef.current.startRight - deltaX), bottom: Math.max(16, cartDragRef.current.startBottom - deltaY) });
  };

  const handleBubblePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setCartDragging(false);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(formatWhatsAppText());
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    if (page === "catalog") {
      window.history.pushState({}, "Catalogo", "/catalogo");
    } else {
      window.history.pushState({}, "Inicio", "/");
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname === "/catalogo" ? "catalog" : "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (serviceDragging) return undefined;
    const timer = setTimeout(() => {
      setActiveServiceIndex((current) => (current + 1) % serviceData.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeServiceIndex, serviceDragging]);

  useEffect(() => {
    const timers = activeTopProductIndices.map((_, index) => {
      if (topProductDraggings[index] || topProductHovers[index]) return null;
      return setTimeout(() => {
        setActiveTopProductIndices((current) => 
          current.map((val, i) => i === index ? (val + 1) % topProducts.length : val)
        );
      }, 4000);
    });
    return () => timers.forEach(timer => timer && clearTimeout(timer));
  }, [activeTopProductIndices, topProductDraggings, topProductHovers, topProducts.length]);

  const handleServicePointerDown = (event) => {
    // Solo capturar pointer si es touch (para permitir scroll natural en desktop)
    if (event.pointerType === 'touch') {
      event.currentTarget.setPointerCapture(event.pointerId);
      setServiceDragging(true);
      serviceDragRef.current = { startX: event.clientX, startY: event.clientY, startIndex: activeServiceIndex };
    }
  };

  const handleServicePointerMove = (event) => {
    if (!serviceDragging || !serviceDragRef.current) return;

    const deltaX = event.clientX - serviceDragRef.current.startX;
    const deltaY = event.clientY - serviceDragRef.current.startY;

    // Solo activar swipe si el movimiento es principalmente horizontal (|deltaX| > |deltaY| * 2)
    // y el movimiento horizontal es significativo (> 60px)
    if (Math.abs(deltaX) > Math.abs(deltaY) * 2 && Math.abs(deltaX) > 60) {
      const direction = deltaX < 0 ? 1 : -1;
      const nextIndex = (serviceDragRef.current.startIndex + direction + serviceData.length) % serviceData.length;
      setActiveServiceIndex(nextIndex);
      serviceDragRef.current = { startX: event.clientX, startY: event.clientY, startIndex: nextIndex };
    }
  };

  const handleServicePointerUp = (event) => {
    if (serviceDragging) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      setServiceDragging(false);
    }
  };

  const prevService = () => setActiveServiceIndex((current) => (current - 1 + serviceData.length) % serviceData.length);
  const nextService = () => setActiveServiceIndex((current) => (current + 1) % serviceData.length);
  const goToService = (index) => setActiveServiceIndex(index);

  const handleTopProductPointerDown = (event, index) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setTopProductDraggings((current) => current.map((val, i) => i === index ? true : val));
    topProductDragRefs.current[index] = { startX: event.clientX, startIndex: activeTopProductIndices[index] };
  };

  const handleTopProductPointerMove = (event, index) => {
    if (!topProductDraggings[index]) return;
    const deltaX = event.clientX - topProductDragRefs.current[index].startX;
    if (Math.abs(deltaX) > 60) {
      const direction = deltaX < 0 ? 1 : -1;
      const nextIndex = (topProductDragRefs.current[index].startIndex + direction + topProducts.length) % topProducts.length;
      setActiveTopProductIndices((current) => current.map((val, i) => i === index ? nextIndex : val));
      topProductDragRefs.current[index] = { startX: event.clientX, startIndex: nextIndex };
    }
  };

  const handleTopProductPointerUp = (event, index) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setTopProductDraggings((current) => current.map((val, i) => i === index ? false : val));
  };

  const handleTopProductHover = (index, isHovering) => {
    setTopProductHovers((current) => current.map((val, i) => i === index ? isHovering : val));
  };

  const prevTopProduct = (index) => setActiveTopProductIndices((current) => current.map((val, i) => i === index ? (val - 1 + topProducts.length) % topProducts.length : val));
  const nextTopProduct = (index) => setActiveTopProductIndices((current) => current.map((val, i) => i === index ? (val + 1) % topProducts.length : val));
  const goToTopProduct = (index, productIndex) => setActiveTopProductIndices((current) => current.map((val, i) => i === index ? productIndex : val));

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.title === product.title);
      if (existing) {
        return current.map((item) => (item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-50 text-sm text-zinc-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-zinc-700">
            <p className="font-semibold">📲 0980752799 · 0991165214 · 0994698636</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-zinc-600">Síguenos:</span>
              <a href="https://instagram.com/vivero.chuskuwarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={instagramLogo} alt="Instagram" className="h-6 w-6 rounded" title="Instagram: @vivero.chuskuwarmi" />
              </a>
              <a href="https://facebook.com/ViveroChuskuWarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={facebookLogo} alt="Facebook" className="h-6 w-6 rounded" title="Facebook: Vivero Chusku Warmi" />
              </a>
              <a href="https://wa.me/593980752799" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={whatsappLogo} alt="WhatsApp" className="h-6 w-6 rounded" title="WhatsApp: 0980752799" />
              </a>
            </div>
          </div>
          <a href="https://wa.me/593980752799" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">Enviar mensaje</a>
        </div>
      </header>

      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Vivero Camuendo" className="h-12 w-12 rounded-2xl object-cover" />
            <div>
              <p className="text-2xl font-bold tracking-tight text-emerald-700">Vivero Camuendo</p>
              <p className="text-xs text-zinc-500">Huertos · Plantas · Jardines</p>
            </div>
          </div>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li><button type="button" onClick={() => navigateToPage("home")} className="hover:text-emerald-700">Inicio</button></li>
            <li><button type="button" onClick={() => navigateToPage("catalog")} className="hover:text-emerald-700">Catálogo</button></li>
            <li><button type="button" onClick={() => { navigateToPage("home"); setTimeout(() => window.location.hash = "#servicios", 50); }} className="hover:text-emerald-700">Servicios</button></li>
            <li><button type="button" onClick={() => { navigateToPage("home"); setTimeout(() => window.location.hash = "#blog", 50); }} className="hover:text-emerald-700">Comunicados</button></li>
            <li><button type="button" onClick={() => { navigateToPage("home"); setTimeout(() => window.location.hash = "#contacto", 50); }} className="hover:text-emerald-700">Contacto</button></li>
          </ul>
        </div>
      </nav>

      <main>
        {currentPage === "home" ? (
          <HomePage
            navigateToPage={navigateToPage}
            activeServiceIndex={activeServiceIndex}
            setActiveServiceIndex={setActiveServiceIndex}
            serviceHover={serviceHover}
            setServiceHover={setServiceHover}
            handleServicePointerDown={handleServicePointerDown}
            handleServicePointerMove={handleServicePointerMove}
            handleServicePointerUp={handleServicePointerUp}
            prevService={prevService}
            nextService={nextService}
            goToService={goToService}
            activeTopProductIndices={activeTopProductIndices}
            topProductHovers={topProductHovers}
            handleTopProductHover={handleTopProductHover}
            handleTopProductPointerDown={handleTopProductPointerDown}
            handleTopProductPointerMove={handleTopProductPointerMove}
            handleTopProductPointerUp={handleTopProductPointerUp}
            prevTopProduct={prevTopProduct}
            nextTopProduct={nextTopProduct}
            goToTopProduct={goToTopProduct}
            handleAddToCart={handleAddToCart}
            topProducts={topProducts}
          />
        ) : (
          <CatalogPage
            navigateToPage={navigateToPage}
            handleAddToCart={handleAddToCart}
            catalogSidebarOpen={catalogSidebarOpen}
            setCatalogSidebarOpen={setCatalogSidebarOpen}
            catalogSelectedCategory={catalogSelectedCategory}
            setCatalogSelectedCategory={setCatalogSelectedCategory}
          />
        )}
      </main>

      <div className="fixed z-40 cursor-grab" style={{ right: cartBubblePosition.right, bottom: cartBubblePosition.bottom }} onClick={() => setCartOpen(true)} onPointerDown={handleBubblePointerDown} onPointerMove={handleBubblePointerMove} onPointerUp={handleBubblePointerUp}>
        <div className="flex h-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full bg-emerald-700 px-4 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-[1.02]">
          <span className="text-lg">🛒</span>
          {cartItems.length > 0 && <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-emerald-700">{cartItems.length}</span>}
        </div>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <div className="mx-auto mt-24 max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Carrito rápido</p>
                <p className="mt-1 text-sm text-zinc-600">Revisa los productos que añadiste antes de enviar.</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800">✕</button>
            </div>
            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-zinc-500">Tu carrito está vacío. Selecciona un producto para añadirlo.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.title} className="rounded-3xl bg-zinc-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.subtitle}</p>
                      </div>
                      <p className="text-sm font-semibold text-emerald-700">x{item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button onClick={handleSendWhatsApp} className="mt-6 w-full rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">📲 Enviar lista por WhatsApp</button>
          </div>
        </div>
      )}

      <footer className="bg-zinc-950 text-zinc-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white">Vivero Camuendo</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">Plantas, huertos y jardines cerca del Lago San Pablo. Contáctanos por WhatsApp para coordinar tu compra y visita.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>📲 0980752799</li>
              <li>📲 0991165214</li>
              <li>📲 0994698636</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Síguenos</h4>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com/vivero.chuskuwarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80" title="Instagram: @vivero.chuskuwarmi">
                <img src={instagramLogo} alt="Instagram" className="h-8 w-8 rounded-lg" />
              </a>
              <a href="https://facebook.com/ViveroChuskuWarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80" title="Facebook: Vivero Chusku Warmi">
                <img src={facebookLogo} alt="Facebook" className="h-8 w-8 rounded-lg" />
              </a>
              <a href="https://wa.me/593980752799" target="_blank" rel="noreferrer" className="transition hover:opacity-80" title="WhatsApp: 0980752799">
                <img src={whatsappLogo} alt="WhatsApp" className="h-8 w-8 rounded-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
