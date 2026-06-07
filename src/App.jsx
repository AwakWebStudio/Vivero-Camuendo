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
    description:
      "Creamos espacios verdes desde cero con propuestas personalizadas, planificación por etapas y selección estratégica de plantas.",
    bullets: [
      "Diseño personalizado residencial o comercial",
      "Propuestas visuales y etapas claras",
      "Selección según clima y suelo",
      "Optimización del espacio",
    ],
  },
  {
    title: "Implementación y desarrollo",
    subtitle: "Ejecutamos con técnica y estilo",
    description:
      "Convertimos el diseño en realidad con instalación cuidada, riego eficiente y detalles que mantienen la armonía del proyecto.",
    bullets: [
      "Preparación de terreno",
      "Instalación de plantas y césped",
      "Sistemas de riego eficientes",
      "Huertos urbanos funcionales",
    ],
  },
  {
    title: "Mantenimiento continuo",
    subtitle: "Cuidado que protege tu inversión",
    description:
      "Ofrecemos mantenimiento regular para mantener la salud, belleza y rendimiento de cada planta y cada área verde.",
    bullets: [
      "Podas programadas",
      "Control de plagas y enfermedades",
      "Fertilización y suelo sano",
      "Supervisión periódica",
    ],
  },
  {
    title: "Asesoría y acompañamiento",
    subtitle: "Apoyo profesional en cada decisión",
    description:
      "Brindamos recomendaciones técnicas claras y planes de mejora para que tu jardín evolucione con seguridad.",
    bullets: [
      "Evaluación del jardín actual",
      "Recomendaciones personalizadas",
      "Planes de mejora y renovación",
      "Apoyo continuo durante el proyecto",
    ],
  },
];

const posts = [
  {
    title: "La agricultura urbana crece en Ecuador",
    excerpt:
      "Proyectos de huertos caseros y jardines de balcón se popularizan como alternativa sostenible y educativa.",
    source: "Revista EcoVivero",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1524594154901-4874c192f089?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Menta y manzanilla: aliados en el hogar",
    excerpt:
      "Estudios recientes confirman que estas plantas ayudan a purificar el aire y reducir el estrés en espacios interiores.",
    source: "Avances Botánicos",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Herbología ancestral para tu jardín",
    excerpt:
      "Sabiduría local recomienda usar ruda y toronjil en jardines para equilibrar energía y proteger cultivos.",
    source: "Herbología Viva",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Plantas nativas impulsan la reforestación",
    excerpt:
      "Viveros y comunidades se unen para promover especies autóctonas que restauran suelos y biodiversidad.",
    source: "Periódico Verde",
    date: "Jun 2026",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=1200&q=80",
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
  handleAddToCart,
  topProducts,
}) {
  const visibleTopProducts = activeTopProductIndices.map((index) => topProducts[index % topProducts.length]);

  return (
    <>
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-cream to-white py-20">
        <div className="hero-deco" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center relative z-10">
          <div className="reveal">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-800">
              Jardinería elegante y sustentable
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Transforma tu jardín con estilo y sentido
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
              Diseñamos espacios verdes que combinan plantas nativas, huertos prácticos y detalles de lujo para tu hogar, comercio o proyecto al aire libre.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigateToPage("catalog")}
                className="btn-shimmer inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-700/30 transition hover:bg-emerald-800"
              >
                Ver catálogo
              </button>
              <button
                type="button"
                onClick={() => navigateToPage("home", "contacto")}
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-emerald-700 hover:text-emerald-700"
              >
                Solicitar contacto
              </button>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-2xl shadow-emerald-100/50 reveal">
            <div className="float-badge absolute -right-6 top-6 rounded-full bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-900 shadow-2xl">
              Asesoría gratis
            </div>
            <div className="h-full rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(6,_95,_70,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(146,_64,_14,0.14),_transparent_22%)] p-8">
              <div className="flex h-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-emerald-700 via-[#0f4a2d] to-[#163c2c] p-10 shadow-inner shadow-emerald-900/20">
                <img
                  src={logoImage}
                  alt="Logo Vivero Camuendo"
                  className="logo-sway h-48 w-48 rounded-[2rem] object-cover shadow-2xl shadow-emerald-900/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mas-vendido" className="bg-cream-soft py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Lo más pedido</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Descubre nuestros favoritos destacados</h2>
            <p className="mt-4 text-zinc-600">
              Productos seleccionados por su calidad, diseño y respuesta en proyectos de jardín. Añádelos al carrito con un toque y recibe atención personalizada.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-7xl rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-2xl shadow-zinc-100 pattern-soft reveal">
            <div className="grid gap-6 md:grid-cols-2">
              {visibleTopProducts.map((product, index) => (
                <div
                  key={`${product.title}-${index}`}
                  className="group rounded-[1.75rem] border border-zinc-200 bg-emerald-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-700 hover:shadow-xl"
                  onPointerEnter={() => handleTopProductHover(index, true)}
                  onPointerLeave={() => handleTopProductHover(index, false)}
                  onPointerDown={(e) => handleTopProductPointerDown(e, index)}
                  onPointerMove={(e) => handleTopProductPointerMove(e, index)}
                  onPointerUp={(e) => handleTopProductPointerUp(e, index)}
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-4xl shadow-md">{product.image}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">{product.subtitle}</p>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.title}</h3>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-zinc-600">{product.details}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex rounded-full bg-white px-3 py-2 text-sm font-semibold text-emerald-800 shadow-sm">{product.category}</span>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#054f3a]"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Servicios</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Gestión integral para tu espacio verde</h2>
            <p className="mt-4 text-zinc-600">Soluciones completas que incluyen diseño, instalación, mantenimiento y acompañamiento técnico.</p>
          </div>

          <div className="relative mx-auto mt-12 max-w-4xl rounded-[2rem] border border-zinc-200 bg-surface p-2 shadow-2xl shadow-zinc-100 reveal">
            <div
              className="group relative overflow-hidden rounded-[2rem]"
              onPointerEnter={() => setServiceHover(true)}
              onPointerLeave={() => setServiceHover(false)}
              onPointerDown={handleServicePointerDown}
              onPointerMove={handleServicePointerMove}
              onPointerUp={handleServicePointerUp}
            >
              <div className="rounded-[2rem] bg-white p-10 sm:p-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-zinc-900">{serviceData[activeServiceIndex].title}</h3>
                    <p className="mt-2 text-sm font-semibold text-emerald-700">{serviceData[activeServiceIndex].subtitle}</p>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 px-4 py-3 text-emerald-700 shadow-sm">
                    <span className="text-2xl">✨</span>
                  </div>
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
              <button
                type="button"
                onClick={prevService}
                className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/95 p-3 text-zinc-700 shadow-lg transition duration-200 ${serviceHover ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-label="Servicio anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextService}
                className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/95 p-3 text-zinc-700 shadow-lg transition duration-200 ${serviceHover ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-label="Siguiente servicio"
              >
                ›
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-3">
              {serviceData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToService(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${activeServiceIndex === index ? 'bg-forest' : 'bg-zinc-300'}`}
                  aria-label={`Ir al servicio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Comunicados</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Explora novedades y tendencias verdes</h2>
            <p className="mt-4 text-zinc-600">Historias seleccionadas para inspirar tu jardín y tu huerto con prácticas responsables y diseño inteligente.</p>
          </div>
          <div className="mt-10 overflow-x-auto pb-6 reveal">
            <div className="flex gap-6 min-w-max px-2">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="min-w-[22rem] rounded-[2rem] bg-cover bg-center p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.18)), url(${post.image})`,
                  }}
                >
                  <div className="mb-4 flex items-center justify-between gap-4 text-xs text-emerald-100">
                    <span>{post.date}</span>
                    <span className="rounded-full bg-white/20 px-3 py-1 font-semibold text-white backdrop-blur">{post.source}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/85">{post.excerpt}</p>
                  <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-white">Leer más →</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden bg-forest py-24 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(6, 95, 70, 0.9), rgba(9, 43, 33, 0.95)), url(${sanpabloImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forest/40 to-forest/95" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Contacto y ubicación</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Visítanos en Plaza Wayku Chupa, Camuendo</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-emerald-100">Estamos cerca del Lago San Pablo con atención permanente para que tu visita sea práctica, segura y productiva.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 reveal">
            <div className="rounded-[2rem] bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur-lg">
              <h3 className="text-xl font-semibold text-white">📍 Dirección</h3>
              <p className="mt-4 text-sm leading-7 text-emerald-100">Calle Mariscal Sucre, entrada "Wayku Chupa", Camuendo, Imbabura, Ecuador.</p>
              <p className="mt-3 text-sm leading-7 text-emerald-100">Referencia: 1 cuadra de las Cabañas del Lago, cerca del Lago San Pablo.</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Plaza+Wayku+Chupa+Camuendo+Imbabura+Ecuador"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Ver en Maps
              </a>
            </div>
            <div className="rounded-[2rem] bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur-lg">
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
        <button
          type="button"
          onClick={() => setCatalogSidebarOpen(true)}
          className="fixed top-20 left-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-xl ring-1 ring-zinc-200 transition hover:bg-emerald-50 md:top-4"
          aria-label="Abrir categorías"
        >
          ☰
        </button>
      )}
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl gap-6 px-4">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[18rem] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${
            catalogSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">Categorías</p>
              <h2 className="mt-2 text-xl font-bold text-zinc-900">Explora por tipo</h2>
            </div>
            <button
              type="button"
              onClick={() => setCatalogSidebarOpen(false)}
              className="rounded-full bg-zinc-100 p-2 text-zinc-700 transition hover:bg-zinc-200"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 sticky-sidebar">
            {categoryData.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => {
                  setCatalogSelectedCategory(category.name);
                  setCatalogSidebarOpen(false);
                }}
                className={`w-full rounded-3xl border px-4 py-4 text-left text-sm font-semibold transition ${
                  category.name === catalogSelectedCategory
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>
        <div className="w-full transition-all duration-300">
          <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCatalogSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg ring-1 ring-zinc-200 transition hover:bg-emerald-50"
                aria-label="Abrir categorías"
              >
                ☰
              </button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Catálogo completo</p>
                <h1 className="text-xl font-bold text-zinc-900">{catalogSelectedCategoryData?.name ?? 'Categoría'}</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigateToPage('home')}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Volver al inicio
            </button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {catalogSelectedProducts.map((product) => (
              <div key={product.title} className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700 hover:shadow-xl overflow-hidden">
                <div className="flex items-center justify-center h-44 rounded-[1.75rem] bg-emerald-50 mb-5">
                  <span className="text-7xl">{product.image}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">{product.subtitle}</p>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{product.details}</p>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="mt-6 w-full rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#054f3a]"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => (window.location.pathname === '/catalogo' ? 'catalog' : 'home'));
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
  const topProductDragRefs = useRef(Array(6).fill().map(() => ({ startX: 0, startIndex: 0 })));

  const [catalogSidebarOpen, setCatalogSidebarOpen] = useState(false);
  const [catalogSelectedCategory, setCatalogSelectedCategory] = useState(categoryData[0].name);

  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const whatsappNumber = '593980752799';

  const allProducts = categoryData.flatMap((cat) => cat.products.map((prod) => ({ ...prod, category: cat.name })));
  const topProducts = allProducts
    .sort((a, b) => {
      const scoreA = (a.views || 0) * 0.5 + (a.clicks || 0) * 0.35 + (a.engagement || 0) * 0.15;
      const scoreB = (b.views || 0) * 0.5 + (b.clicks || 0) * 0.35 + (b.engagement || 0) * 0.15;
      return scoreB - scoreA;
    })
    .slice(0, 8);

  const cartTotalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message) => {
    setToast({ visible: true, message });
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3200);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  const scrollToSection = (id) => {
    setMobileNavOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => {
      section.classList.add('reveal');
      observer.observe(section);
    });

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [currentPage]);

  useEffect(() => {
    if (serviceDragging) return undefined;
    const timer = window.setTimeout(() => setActiveServiceIndex((current) => (current + 1) % serviceData.length), 9500);
    return () => window.clearTimeout(timer);
  }, [activeServiceIndex, serviceDragging]);

  useEffect(() => {
    const timers = activeTopProductIndices.map((_, index) => {
      if (topProductDraggings[index] || topProductHovers[index]) return null;
      return window.setTimeout(() => {
        setActiveTopProductIndices((current) => current.map((val, i) => (i === index ? (val + 1) % topProducts.length : val)));
      }, 3800 + index * 180);
    });

    return () => timers.forEach((timer) => timer && window.clearTimeout(timer));
  }, [activeTopProductIndices, topProductDraggings, topProductHovers, topProducts.length]);

  const handleBubblePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setCartDragging(true);
    cartDragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startRight: cartBubblePosition.right,
      startBottom: cartBubblePosition.bottom,
    };
  };

  const handleBubblePointerMove = (event) => {
    if (!cartDragging) return;
    const deltaX = event.clientX - cartDragRef.current.startX;
    const deltaY = event.clientY - cartDragRef.current.startY;
    setCartBubblePosition({
      right: Math.max(16, cartDragRef.current.startRight - deltaX),
      bottom: Math.max(16, cartDragRef.current.startBottom - deltaY),
    });
  };

  const handleBubblePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setCartDragging(false);
  };

  const formatWhatsAppText = () => {
    if (cartItems.length === 0) return "Hola, deseo recibir información sobre sus productos y servicios de vivero.";
    const lines = ["Hola, quisiera solicitar esta lista de productos:"];
    cartItems.forEach((item) => lines.push(`- ${item.title} (${item.subtitle}) x${item.quantity}`));
    lines.push("", "Gracias, por favor contáctame para coordinar la compra.");
    return lines.join("\n");
  };

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) {
      showToast("El carrito está vacío. Agrega productos antes de enviar.");
      return;
    }
    const text = encodeURIComponent(formatWhatsAppText());
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  const navigateToPage = (page, sectionId) => {
    setCurrentPage(page);
    setMobileNavOpen(false);
    if (page === "home" && sectionId) {
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
    if (page === "catalog") {
      window.history.pushState({}, "Catálogo", "/catalogo");
    } else {
      window.history.pushState({}, "Inicio", "/");
    }
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPage(window.location.pathname === "/catalogo" ? "catalog" : "home");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleServicePointerDown = (event) => {
    if (event.pointerType === "touch") {
      event.currentTarget.setPointerCapture(event.pointerId);
      setServiceDragging(true);
      serviceDragRef.current = { startX: event.clientX, startY: event.clientY, startIndex: activeServiceIndex };
    }
  };

  const handleServicePointerMove = (event) => {
    if (!serviceDragging) return;
    const deltaX = event.clientX - serviceDragRef.current.startX;
    if (Math.abs(deltaX) > 60) {
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
    setTopProductDraggings((current) => current.map((val, i) => (i === index ? true : val)));
    topProductDragRefs.current[index] = { startX: event.clientX, startIndex: activeTopProductIndices[index] };
  };

  const handleTopProductPointerMove = (event, index) => {
    if (!topProductDraggings[index]) return;
    const deltaX = event.clientX - topProductDragRefs.current[index].startX;
    if (Math.abs(deltaX) > 60) {
      const direction = deltaX < 0 ? 1 : -1;
      const nextIndex = (topProductDragRefs.current[index].startIndex + direction + topProducts.length) % topProducts.length;
      setActiveTopProductIndices((current) => current.map((val, i) => (i === index ? nextIndex : val)));
      topProductDragRefs.current[index] = { startX: event.clientX, startIndex: nextIndex };
    }
  };

  const handleTopProductPointerUp = (event, index) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setTopProductDraggings((current) => current.map((val, i) => (i === index ? false : val)));
  };

  const handleTopProductHover = (index, isHovering) => {
    setTopProductHovers((current) => current.map((val, i) => (i === index ? isHovering : val)));
  };

  const prevTopProduct = (index) =>
    setActiveTopProductIndices((current) => current.map((val, i) => (i === index ? (val - 1 + topProducts.length) % topProducts.length : val)));

  const nextTopProduct = (index) =>
    setActiveTopProductIndices((current) => current.map((val, i) => (i === index ? (val + 1) % topProducts.length : val)));

  const goToTopProduct = (index, productIndex) =>
    setActiveTopProductIndices((current) => current.map((val, i) => (i === index ? productIndex : val)));

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.title === product.title);
      if (existing) {
        return current.map((item) => (item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
    showToast(`Añadido ${product.title} al carrito`);
  };

  const updateCartQuantity = (title, delta) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.title !== title) return item;
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQuantity) };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (title) => {
    setCartItems((current) => current.filter((item) => item.title !== title));
    showToast('Elemento eliminado del carrito');
  };

  return (
    <div className="min-h-screen bg-cream text-zinc-900">
      <nav className={`sticky top-0 z-50 border-b border-zinc-200 bg-white/95 transition ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="logo-sway flex items-center gap-3 rounded-3xl bg-emerald-50 px-4 py-2 shadow-lg shadow-emerald-100/60">
              <img src={logoImage} alt="Vivero Camuendo" className="h-12 w-12 rounded-2xl object-cover" />
              <div>
                <p className="text-2xl font-bold tracking-tight text-forest">Vivero Camuendo</p>
                <p className="text-xs text-zinc-500">Huertos · Plantas · Jardines</p>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <button type="button" onClick={() => navigateToPage('home')} className={`transition ${currentPage === 'home' && activeSection === 'inicio' ? 'text-forest' : 'text-zinc-600 hover:text-forest'}`}>
              Inicio
            </button>
            <button type="button" onClick={() => navigateToPage('catalog')} className={`transition ${currentPage === 'catalog' ? 'text-forest' : 'text-zinc-600 hover:text-forest'}`}>
              Catálogo
            </button>
            <button type="button" onClick={() => scrollToSection('servicios')} className={`transition ${activeSection === 'servicios' ? 'text-forest' : 'text-zinc-600 hover:text-forest'}`}>
              Servicios
            </button>
            <button type="button" onClick={() => scrollToSection('blog')} className={`transition ${activeSection === 'blog' ? 'text-forest' : 'text-zinc-600 hover:text-forest'}`}>
              Comunicados
            </button>
            <button type="button" onClick={() => scrollToSection('contacto')} className={`transition ${activeSection === 'contacto' ? 'text-forest' : 'text-zinc-600 hover:text-forest'}`}>
              Contacto
            </button>
          </div>

          <button type="button" onClick={() => setMobileNavOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-emerald-50 md:hidden" aria-label="Abrir menú móvil">
            ☰
          </button>
        </div>
        <div className={`md:hidden ${mobileNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'} transition-all duration-300 bg-white/95 border-t border-zinc-200 shadow-xl`}>
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="space-y-3">
              <button type="button" onClick={() => { navigateToPage('home'); setMobileNavOpen(false); }} className="w-full text-left text-sm font-semibold text-zinc-700 hover:text-forest">
                Inicio
              </button>
              <button type="button" onClick={() => { navigateToPage('catalog'); setMobileNavOpen(false); }} className="w-full text-left text-sm font-semibold text-zinc-700 hover:text-forest">
                Catálogo
              </button>
              <button type="button" onClick={() => scrollToSection('servicios')} className="w-full text-left text-sm font-semibold text-zinc-700 hover:text-forest">
                Servicios
              </button>
              <button type="button" onClick={() => scrollToSection('blog')} className="w-full text-left text-sm font-semibold text-zinc-700 hover:text-forest">
                Comunicados
              </button>
              <button type="button" onClick={() => scrollToSection('contacto')} className="w-full text-left text-sm font-semibold text-zinc-700 hover:text-forest">
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'home' ? (
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
        <div className="flex h-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full bg-forest px-4 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-[1.03]">
          <span className="text-lg">🛒</span>
          {cartTotalQuantity > 0 && <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-forest">{cartTotalQuantity}</span>}
        </div>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <div className="mx-auto mt-24 max-w-md transform rounded-[2rem] bg-white p-6 shadow-2xl transition duration-300 cart-panel open" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Carrito rápido</p>
                <p className="mt-1 text-sm text-zinc-600">Ajusta cantidades o elimina antes de enviar WhatsApp.</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800">
                ✕
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-zinc-500">Tu carrito está vacío. Agrega productos para continuar.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] bg-zinc-50 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.subtitle}</p>
                      </div>
                      <button type="button" onClick={() => removeCartItem(item.title)} className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-900">
                        Eliminar
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white">
                        <button onClick={() => updateCartQuantity(item.title, -1)} className="h-10 w-10 rounded-l-full border-r border-zinc-200 bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200">
                          −
                        </button>
                        <span className="min-w-[2.5rem] text-center text-sm font-semibold text-zinc-900">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.title, 1)} className="h-10 w-10 rounded-r-full border-l border-zinc-200 bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200">
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-forest">Total: {item.quantity}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-forest">
              <span>Total de ítems</span>
              <span>{cartTotalQuantity}</span>
            </div>
            <button onClick={handleSendWhatsApp} className="mt-6 w-full rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#054f3a]">
              📲 Enviar lista por WhatsApp
            </button>
          </div>
        </div>
      )}

      <div
        className={`fixed left-1/2 bottom-8 z-50 w-full max-w-sm -translate-x-1/2 rounded-[2rem] px-5 py-4 text-sm text-white shadow-2xl toast-panel ${
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>

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
              <a href="https://instagram.com/vivero.chuskuwarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={instagramLogo} alt="Instagram" className="h-8 w-8 rounded-lg" />
              </a>
              <a href="https://facebook.com/ViveroChuskuWarmi" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={facebookLogo} alt="Facebook" className="h-8 w-8 rounded-lg" />
              </a>
              <a href="https://wa.me/593980752799" target="_blank" rel="noreferrer" className="transition hover:opacity-80">
                <img src={whatsappLogo} alt="WhatsApp" className="h-8 w-8 rounded-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
