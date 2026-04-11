import React from "react";

const categories = [
  "Cajones para huertas",
  "Accesorios de jardinería",
  "Plantas",
  "Combos y promociones",
  "Sustratos",
  "Maceteros",
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
  return (
    <div className="min-h-screen bg-white text-zinc-800">
      <header className="border-b border-zinc-200 bg-zinc-50 text-sm text-zinc-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p>Tu negocio de plantas, huertos y jardinería</p>
          <p>WhatsApp · Instagram · Facebook</p>
        </div>
      </header>

      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-emerald-700">Vivero Camuendo</p>
            <p className="text-xs text-zinc-500">Huertos · Plantas · Jardines</p>
          </div>

          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            <li><a href="#inicio" className="hover:text-emerald-700">Inicio</a></li>
            <li><a href="#catalogo" className="hover:text-emerald-700">Catálogo</a></li>
            <li><a href="#nosotros" className="hover:text-emerald-700">Nosotros</a></li>
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
                Personaliza esta sección con tus productos, servicios y propuesta de valor.
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

        <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Catálogo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Explora nuestras categorías destacadas
            </h2>
            <p className="mt-4 text-zinc-600">
              Aquí iremos colocando las secciones principales de tu catálogo, con imágenes reales,
              nombres correctos y enlaces a tus productos o servicios.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <article
                key={item}
                className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 aspect-[4/3] rounded-2xl bg-zinc-100 transition group-hover:bg-emerald-50" />
                <h3 className="text-xl font-semibold text-zinc-900">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Texto breve de categoría. Aquí puedes explicar qué ofreces dentro de esta sección.
                </p>
                <button className="mt-4 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800">
                  Ver más →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="servicios" className="bg-zinc-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Servicios
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Soluciones verdes para distintos espacios
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                "Diseño de jardines",
                "Huertos urbanos",
                "Mantenimiento de áreas verdes",
              ].map((service) => (
                <div key={service} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
                  <h3 className="text-xl font-semibold text-zinc-900">{service}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Describe aquí el alcance del servicio, beneficios y el tipo de cliente al que va dirigido.
                  </p>
                </div>
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
              Contenido para informar y atraer clientes
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-5 aspect-[16/10] rounded-2xl bg-zinc-100" />
                <h3 className="text-xl font-semibold text-zinc-900">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{post.excerpt}</p>
                <button className="mt-4 text-sm font-semibold text-emerald-700">Leer más →</button>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="bg-emerald-700 py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Quieres una web como esta, pero con tu marca?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-50">
              Aquí colocaremos tu llamada a la acción principal: WhatsApp, formulario, cotización o contacto directo.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="#"
                className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white">Vivero Camuendo</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              Personaliza este pie de página con tu dirección, redes, horarios, teléfono, correo y enlaces importantes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Enlaces</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>Inicio</li>
              <li>Catálogo</li>
              <li>Servicios</li>
              <li>Contacto</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              <li>Quito, Ecuador</li>
              <li>+593 000 000 000</li>
              <li>correo@tumarca.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
