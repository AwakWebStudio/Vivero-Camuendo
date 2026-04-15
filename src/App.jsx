import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import logoImage from "./assets/vivero-camuendo.jpg";
import { categoryData } from "./catalog.js";

const serviceData = [
  {
    title: "Diseño de jardines",
    description: "Creamos jardines personalizados que aprovechan cada metro de tu espacio.",
    bullets: [
      "Propuestas visuales 3D",
      "Selección de plantas y accesorios",
      "Mantenimiento inicial incluido",
    ],
  },
  {
    title: "Huertos urbanos",
    description: "Sistemas prácticos para cultivar verduras y hierbas en balcones y terrazas.",
    bullets: [
      "Cajones modulares",
      "Instalación y riego",
      "Asesoría en cultivo sostenible",
    ],
  },
  {
    title: "Mantenimiento de áreas verdes",
    description: "Cuidado profesional para mantener tus plantas saludables todo el año.",
    bullets: [
      "Poda y fertilización",
      "Control de plagas naturales",
      "Revisión periódica de riego",
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

  const activeCategoryData = categoryData.find((category) => category.name === activeCategory);
  const pageSize = 3;
  const activeProducts = activeCategoryData.products;
  const pageCount = Math.max(1, Math.ceil(activeProducts.length / pageSize));
  const pageProducts = activeProducts.slice(catalogPage * pageSize, catalogPage * pageSize + pageSize);
  const activeProduct = activeProducts[activeProductIndex] || pageProducts[0];

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
            <p className="text-zinc-600">📷 Instagram: @vivero.chuskuwarmi · 📘 Facebook: Vivero Chusku Warmi</p>
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
            <li><a href="#inicio" className="hover:text-emerald-700">Inicio</a></li>
            <li><a href="#catalogo" className="hover:text-emerald-700">Catálogo</a></li>
            <li><a href="#servicios" className="hover:text-emerald-700">Servicios</a></li>
            <li><a href="#blog" className="hover:text-emerald-700">Comunicados</a></li>
            <li><a href="#contacto" className="hover:text-emerald-700">Contacto</a></li>
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
                <a
                  href="#catalogo"
                  className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Ver catálogo
                </a>
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

        <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20 overflow-x-hidden">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Catálogo interactivo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Navega por categorías sin perder el ritmo
            </h2>
            <p className="mt-4 text-zinc-600">
              Selecciona una categoría y navega entre productos con una experiencia ordenada y sin scroll horizontal.
            </p>
          </div>

          <div className="mt-8 overflow-hidden">
            <div
              ref={carouselRef}
              className="catalog-carousel flex gap-3 overflow-x-auto px-1 py-1 scrollbar-hide"
              onPointerDown={() => setCarouselInteracting(true)}
              onPointerUp={() => setCarouselInteracting(false)}
              onPointerLeave={() => setCarouselInteracting(false)}
              onPointerCancel={() => setCarouselInteracting(false)}
            >
              {[...categoryData, ...categoryData].map((category, index) => (
                <button
                  key={`${category.name}-${index}`}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setActiveProductIndex(0);
                    setCatalogPage(0);
                  }}
                  className={`flex-shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    category.name === activeCategory
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Explora productos</p>
                  <p className="mt-2 text-sm text-zinc-600">Selecciona un producto para ver detalles y agregarlo al carrito.</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Nivel 2
                </span>
              </div>

              <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-zinc-50 p-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Opciones del catálogo</p>
                    <p className="mt-2 text-sm text-zinc-600">Desliza o arrastra para avanzar más rápido o más lento.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                    <button
                      onClick={() => {
                        const newPage = Math.max(0, catalogPage - 1);
                        setCatalogPage(newPage);
                        setActiveProductIndex(newPage * pageSize);
                      }}
                      disabled={catalogPage === 0}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-2 transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Página
                    </button>
                    <span>
                      {catalogPage + 1}/{pageCount}
                    </span>
                    <button
                      onClick={() => {
                        const newPage = Math.min(pageCount - 1, catalogPage + 1);
                        setCatalogPage(newPage);
                        setActiveProductIndex(newPage * pageSize);
                      }}
                      disabled={catalogPage === pageCount - 1}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-2 transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Página →
                    </button>
                  </div>
                </div>

                <div className="mt-6 pb-4">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {pageProducts.map((product, index) => {
                      const globalIndex = catalogPage * pageSize + index;
                      return (
                        <button
                          key={product.title}
                          onClick={() => setActiveProductIndex(globalIndex)}
                          className={`w-full rounded-3xl border p-5 text-left transition ${
                            globalIndex === activeProductIndex
                              ? "border-emerald-700 bg-emerald-700 text-white shadow-lg"
                              : "border-zinc-200 bg-white text-zinc-900 hover:border-emerald-700"
                          }`}
                        >
                          <p className="text-sm font-semibold">{product.subtitle}</p>
                          <h3 className="mt-3 text-xl font-semibold">{product.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-zinc-500">{product.details}</p>
                          <p className="mt-4 text-sm font-semibold">{product.price}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Carrito rápido</p>
                    <p className="mt-2 text-sm text-zinc-600">Lista de productos que deseas revisar o agregar luego.</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {cartItems.length} item{cartItems.length === 1 ? "" : "s"}
                  </span>
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
                <div className="mt-6">
                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    📲 Enviar lista por WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-8 shadow-lg ring-1 ring-emerald-100">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {activeCategoryData.name}
              </p>
              <p className="mt-4 text-lg leading-8 text-zinc-700">{activeCategoryData.description}</p>
              <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      Producto destacado
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-zinc-900">{activeProduct.title}</h3>
                    <p className="mt-2 text-sm text-zinc-500">{activeProduct.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    {activeProduct.price ?? "Consultar precio"}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-7 text-zinc-600">{activeProduct.details}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleAddToCart(activeProduct)}
                    className="inline-flex items-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    Agregar al carrito
                  </button>
                  <button className="inline-flex items-center rounded-full border border-emerald-700 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>

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
        </section>

        <section id="servicios" className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Servicios
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Soluciones dinámicas para tu proyecto verde
              </h2>
            </div>

            <div className="mt-8 overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max">
                {serviceData.map((service, index) => (
                  <button
                    key={service.title}
                    onClick={() => setActiveServiceIndex(index)}
                    className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                      index === activeServiceIndex
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{serviceData[activeServiceIndex].title}</p>
                <h3 className="mt-4 text-3xl font-bold text-zinc-900">{serviceData[activeServiceIndex].description}</h3>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-zinc-600">
                  {serviceData[activeServiceIndex].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-700" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-emerald-700 p-8 text-white shadow-lg ring-1 ring-emerald-600">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Servicio complementario</p>
                <h3 className="mt-4 text-3xl font-bold">Apoyo para proyectos a medida</h3>
                <p className="mt-6 text-sm leading-7 text-emerald-100">
                  Si quieres llevar tu espacio verde al siguiente nivel, podemos acompañarte con asesoría en diseño, instalación y mantenimiento.
                </p>
                <div className="mt-8 rounded-3xl bg-white/10 p-5">
                  <p className="text-sm font-semibold text-white">Agenda una visita</p>
                  <p className="mt-2 text-sm text-emerald-100">Explora opciones de servicio personalizadas para tu casa o negocio.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Comunicados
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Contenido para informar y atraer clientes
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
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>📷 Instagram: @vivero.chuskuwarmi</li>
              <li>📘 Facebook: Vivero Chusku Warmi</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
