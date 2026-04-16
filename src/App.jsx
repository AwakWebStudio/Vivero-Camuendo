import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logoImage from "./assets/vivero-camuendo.jpg";
import facebookLogo from "../imag_logo/Facebook_Logo.png";
import whatsappLogo from "../imag_logo/WhatsApp_logo.png";
import instagramLogo from "../imag_logo/instagram-logo.png";
import { categoryData } from "./catalog.js";

const serviceData = [
  {
    date: "05 Ene",
    title: "Planificación y diseño",
    subtitle: "Jardines funcionales y sostenibles",
    description: "Creamos espacios verdes desde cero con propuestas personalizadas, planificación por etapas y selección estratégica de plantas.",
    bullets: [
      "Diseño personalizado residencial o comercial",
      "Propuestas visuales y etapas claras",
      "Selección según clima y suelo",
      "Optimización del espacio",
    ],
  },
  {
    date: "18 Feb",
    title: "Implementación y desarrollo",
    subtitle: "Ejecutamos con técnica y estilo",
    description: "Convertimos el diseño en realidad con instalación cuidada, riego eficiente y detalles que mantienen la armonía del proyecto.",
    bullets: [
      "Preparación de terreno",
      "Instalación de plantas y césped",
      "Sistemas de riego eficientes",
      "Huertos urbanos funcionales",
    ],
  },
  {
    date: "12 Mar",
    title: "Mantenimiento continuo",
    subtitle: "Cuidado que protege tu inversión",
    description: "Ofrecemos mantenimiento regular para mantener la salud, belleza y rendimiento de cada planta y cada área verde.",
    bullets: [
      "Podas programadas",
      "Control de plagas y enfermedades",
      "Fertilización y suelo sano",
      "Supervisión periódica",
    ],
  },
  {
    date: "25 Abr",
    title: "Asesoría y acompañamiento",
    subtitle: "Apoyo profesional en cada decisión",
    description: "Brindamos recomendaciones técnicas claras y planes de mejora para que tu jardín evolucione con seguridad.",
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
    title: "Cómo elegir plantas para interiores",
    excerpt:
      "Guía básica para escoger especies resistentes, decorativas y adecuadas para tu espacio.",
  },
  {
    title: "Ideas para huertos urbanos",
    excerpt:
      "Opciones prácticas para cultivar en balcones, terrazas y patios pequeños.",
  },
  {
    title: "Mantenimiento de jardines",
    excerpt:
      "Consejos para conservar áreas verdes saludables y visualmente atractivas todo el año.",
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(categoryData[0].name);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [catalogPage, setCatalogPage] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");
  const [catalogSidebarOpen, setCatalogSidebarOpen] = useState(true);
  const [catalogSelectedCategory, setCatalogSelectedCategory] = useState(categoryData[0].name);
  const [catalogSelectedProductIndex, setCatalogSelectedProductIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBubblePosition, setCartBubblePosition] = useState({ right: 28, bottom: 28 });
  const [cartDragging, setCartDragging] = useState(false);
  const cartDragRef = useRef({ startX: 0, startY: 0, startRight: 28, startBottom: 28 });
  const [carouselInteracting, setCarouselInteracting] = useState(false);
  const carouselRef = useRef(null);

  const whatsappNumber = "593980752799";
  const formatWhatsAppText = () => {
    if (cartItems.length === 0) {
      return "Hola, deseo recibir información sobre sus productos y servicios de vivero.";
    }

    const lines = [
      "Hola, quisiera solicitar esta lista de productos:",
      ...cartItems.map((item) => `- ${item.title} (${item.subtitle}) x${item.quantity}`),
      "",
      "Gracias, por favor contáctame para coordinar la compra."
    ];

    return lines.join("\n");
  };

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

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(formatWhatsAppText());
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    let animationFrame = 0;
    const step = () => {
      if (!carouselInteracting && node.scrollWidth > 0) {
        const halfWidth = node.scrollWidth / 2;
        node.scrollLeft += 0.35;
        if (node.scrollLeft >= halfWidth) {
          node.scrollLeft -= halfWidth;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [carouselInteracting]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveServiceIndex((current) => (current + 1) % serviceData.length);
    }, 10000);

    return () => clearTimeout(timer);
  }, [activeServiceIndex]);

  const activeCategoryData = categoryData.find((category) => category.name === activeCategory);
  const pageSize = 3;
  const activeProducts = activeCategoryData.products;
  const pageCount = Math.max(1, Math.ceil(activeProducts.length / pageSize));
  const pageProducts = activeProducts.slice(catalogPage * pageSize, catalogPage * pageSize + pageSize);
  const activeProduct = activeProducts[activeProductIndex] || pageProducts[0];

  const catalogSelectedCategoryData = categoryData.find((category) => category.name === catalogSelectedCategory);
  const catalogSelectedProducts = catalogSelectedCategoryData?.products ?? [];
  const catalogSelectedProduct = catalogSelectedProducts[catalogSelectedProductIndex] || catalogSelectedProducts[0];

  const allProducts = categoryData.flatMap((category) =>
    category.products.map((product) => ({ ...product, category: category.name }))
  );

  const getPopularityScore = (product) =>
    (product.views ?? 0) * 0.5 + (product.clicks ?? 0) * 0.35 + (product.engagement ?? 0) * 0.15;

  const popularProducts = [...allProducts]
    .sort((a, b) => getPopularityScore(b) - getPopularityScore(a))
    .slice(0, 6);

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.title === product.title);
      if (existing) {
        return current.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        );
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
          <a
            href="https://wa.me/593980752799"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Enviar mensaje
          </a>
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
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage("home")}
                className="hover:text-emerald-700"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setCurrentPage("catalog")}
                className="hover:text-emerald-700"
              >
                Catálogo
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home");
                  setTimeout(() => window.location.hash = "#servicios", 50);
                }}
                className="hover:text-emerald-700"
              >
                Servicios
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home");
                  setTimeout(() => window.location.hash = "#blog", 50);
                }}
                className="hover:text-emerald-700"
              >
                Comunicados
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home");
                  setTimeout(() => window.location.hash = "#contacto", 50);
                }}
                className="hover:text-emerald-700"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                Jardinería y bienestar natural
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Plantas, huertos y jardines para transformar tu espacio
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                Creamos experiencias verdes para hogares, oficinas y proyectos comerciales.
                Descubre productos, promociones y servicios con navegación interna para explorar sin exceso de scroll.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentPage("catalog")}
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Ver catálogo
                </button>
                <a
                  href="#contacto"
                  className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-700 hover:text-emerald-700"
                >
                  Solicitar información
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-100/50">
              <div className="aspect-[4/3] rounded-2xl bg-[linear-gradient(135deg,#d1fae5,#ecfccb,#ffffff)]" />
            </div>
          </div>
        </section>

        {currentPage === "home" ? (
          <>
            <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20">
              <div className="max-w-2xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Catálogo
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                      Productos más populares
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage("catalog")}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    Ver catálogo completo
                  </button>
                </div>
                <p className="mt-4 max-w-2xl text-zinc-600">
                  Los productos más vistos y más clicados por nuestros clientes. Ideal para ver rápido lo que está en tendencia.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {popularProducts.map((product) => (
                  <div key={product.title} className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-700 hover:shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{product.category}</p>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-900">{product.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{product.details}</p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-95"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section id="catalog-page" className="min-h-screen bg-emerald-50 py-8 text-zinc-900">
            {!catalogSidebarOpen && (
              <button
                type="button"
                onClick={() => setCatalogSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-xl ring-1 ring-zinc-200 transition hover:bg-emerald-50"
                aria-label="Abrir categorías"
              >
                ☰
              </button>
            )}
            <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-6 px-4">
              <aside className={`fixed inset-y-0 left-0 z-30 w-[18rem] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:relative lg:translate-x-0 ${catalogSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Categorías</p>
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
                <div className="space-y-3">
                  {categoryData.map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => {
                        setCatalogSelectedCategory(category.name);
                        setCatalogSelectedProductIndex(0);
                        setCatalogSidebarOpen(false);
                      }}
                      className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        category.name === catalogSelectedCategory
                          ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm"
                          : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </aside>

              <div className={`w-full transition-all duration-300 ${catalogSidebarOpen ? "lg:pl-[18rem]" : "lg:pl-0"}`}>
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCatalogSidebarOpen(true)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg ring-1 ring-zinc-200 transition hover:bg-emerald-50"
                      aria-label="Abrir categorías"
                    >
                      ☰
                    </button>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Catálogo completo</p>
                      <h1 className="text-xl font-bold text-zinc-900">{catalogSelectedCategoryData?.name ?? "Categoría"}</h1>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage("home")}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Volver al inicio
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {catalogSelectedProducts.map((product) => (
                    <div key={product.title} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-700 hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{product.subtitle}</p>
                          <h3 className="mt-2 text-lg font-semibold text-zinc-900">{product.title}</h3>
                        </div>
                        <button
                          type="button"
                          className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                        >
                          {product.category}
                        </button>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-zinc-600">{product.details}</p>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="mt-6 w-full rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <div
          className="fixed z-40 cursor-grab"
          style={{ right: cartBubblePosition.right, bottom: cartBubblePosition.bottom }}
          onClick={() => setCartOpen(true)}
          onPointerDown={handleBubblePointerDown}
          onPointerMove={handleBubblePointerMove}
          onPointerUp={handleBubblePointerUp}
        >
          <div className="flex h-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full bg-emerald-700 px-4 text-white shadow-2xl shadow-emerald-900/30 transition hover:scale-[1.02]">
            <span className="text-lg">🛒</span>
            {cartItems.length > 0 && (
              <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-emerald-700">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {cartOpen && (
          <div
            className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <div
              className="mx-auto mt-24 max-w-md rounded-3xl bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Carrito rápido</p>
                  <p className="mt-1 text-sm text-zinc-600">Revisa los productos que añadiste antes de enviar.</p>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                >
                  ✕
                </button>
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

              <button
                onClick={handleSendWhatsApp}
                className="mt-6 w-full rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                📲 Enviar lista por WhatsApp
              </button>
            </div>
          </div>
        )}

        <section id="servicios" className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Servicios
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Gestión integral para tu espacio verde
              </h2>
              <p className="mt-4 text-zinc-600">
                Ofrecemos soluciones completas de jardinería enfocadas en la planificación, cuidado y evolución de tus áreas verdes.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm shadow-emerald-100/50">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Gestión integral para tu espacio verde</p>
                  <h3 className="mt-4 text-2xl font-bold text-zinc-900">Soluciones completas con enfoque técnico y estético</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    Planificamos, ejecutamos y acompañamos cada etapa del proyecto para que tu jardín crezca saludable, bello y funcional.
                  </p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-6 text-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-2xl text-white shadow-sm">🌿</span>
                  <p className="mt-4 text-sm font-semibold text-emerald-900">Profesionalismo visible en cada detalle</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Atención técnica, estética y de largo plazo para jardines residenciales y comerciales.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start">
              <div className="hidden lg:flex lg:flex-col lg:gap-3">
                {serviceData.slice(0, 2).map((service, index) => (
                  <button
                    key={service.date}
                    type="button"
                    onClick={() => setActiveServiceIndex(index)}
                    className={`rounded-3xl border px-4 py-4 text-left transition ${
                      activeServiceIndex === index
                        ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{service.date}</p>
                    <p className="mt-3 font-semibold text-zinc-900">{service.title}</p>
                  </button>
                ))}
              </div>

              <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm shadow-zinc-100">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">{serviceData[activeServiceIndex].date}</p>
                    <h3 className="mt-3 text-3xl font-bold text-zinc-900">{serviceData[activeServiceIndex].title}</h3>
                    <p className="mt-2 text-sm font-semibold text-zinc-600">{serviceData[activeServiceIndex].subtitle}</p>
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

              <div className="hidden lg:flex lg:flex-col lg:gap-3">
                {serviceData.slice(2).map((service, index) => (
                  <button
                    key={service.date}
                    type="button"
                    onClick={() => setActiveServiceIndex(index + 2)}
                    className={`rounded-3xl border px-4 py-4 text-left transition ${
                      activeServiceIndex === index + 2
                        ? "border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{service.date}</p>
                    <p className="mt-3 font-semibold text-zinc-900">{service.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:hidden">
              {serviceData.map((service, index) => (
                <button
                  key={service.date}
                  type="button"
                  onClick={() => setActiveServiceIndex(index)}
                  className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                    activeServiceIndex === index
                      ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {service.date}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Comunicados
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Explora el mundo hoy
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto pb-6">
            <div className="flex gap-6 min-w-max">
              {posts.map((post) => (
                <article key={post.title} className="min-w-[22rem] rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 aspect-[16/10] rounded-2xl bg-zinc-100" />
                  <h3 className="text-xl font-semibold text-zinc-900">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{post.excerpt}</p>
                  <button className="mt-4 text-sm font-semibold text-emerald-700">Leer más →</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-emerald-700 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Contacto y ubicación
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Visítanos en Plaza Wayku Chupa, Camuendo
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-100">
                Estamos a un paso del Lago San Pablo, con atención todo el fin de semana y espacio seguro para estacionar.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur">
                <h3 className="text-xl font-semibold text-white">📍 Ubicación</h3>
                <p className="mt-4 text-sm leading-7 text-emerald-100">
                  Calle Mariscal Sucre y entrada "Wayku Chupa", Camuendo, Imbabura, Ecuador.
                </p>
                <p className="mt-3 text-sm leading-7 text-emerald-100">
                  Referencia: A 1 cuadra de las Cabañas del Lago, cerca del Lago San Pablo (Imbakucha), Otavalo.
                </p>
                <p className="mt-3 text-sm leading-7 text-emerald-100">Código postal: 100450</p>

                <div className="mt-6 space-y-4 text-sm leading-7 text-emerald-100">
                  <div>
                    <strong className="font-semibold text-white">Desde Otavalo:</strong>
                    <p className="mt-1">Toma la vía hacia el Lago San Pablo. Pasa las Cabañas del Lago y gira a la derecha en la entrada "Wayku Chupa". Está a 100 metros.</p>
                  </div>
                  <div>
                    <strong className="font-semibold text-white">Desde Lago San Pablo:</strong>
                    <p className="mt-1">Desde el centro, toma la calle principal hacia Otavalo. Busca la entrada "Wayku Chupa" a tu izquierda.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">🕒 Horarios de atención</h3>
                  <p className="mt-4 text-sm leading-7 text-emerald-100">Lunes a sábado: 08:00 – 17:30</p>
                  <p className="mt-2 text-sm leading-7 text-emerald-100">Domingo: 10:30 – 17:30</p>
                </div>

                <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">🚗 Estacionamiento</h3>
                  <p className="mt-4 text-sm leading-7 text-emerald-100">
                    Disponibilidad de espacio para estacionar vehículos de forma segura cerca del vivero.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">� Ubicación</h3>
                  <p className="mt-4 text-sm leading-7 text-emerald-100">Plaza Wayku Chupa, Camuendo, Imbabura, Ecuador</p>
                  <p className="mt-3 text-sm leading-7 text-emerald-100">A un paso del Lago San Pablo, cerca de las Cabañas del Lago.</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plaza+Wayku+Chupa+Camuendo+Imbabura+Ecuador"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Ver en Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white">Vivero Camuendo</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Plantas, huertos y jardines cerca del Lago San Pablo.
              Contáctanos por WhatsApp para coordinar tu compra y visita.
            </p>
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
