# Vivero Camuendo

Sitio web para el vivero Vivero Camuendo, especializado en plantas, huertos y jardinería.

## Tecnologías utilizadas

- **React 19** - Framework de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida y moderna
- **Tailwind CSS** - Framework de CSS utilitario para estilos rápidos

## Instalación y ejecución

1. Asegúrate de tener Node.js 20.19+ o 22.12+ instalado
2. Clona o descarga el proyecto
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre http://localhost:5173 en tu navegador

## Estructura del proyecto

- `src/App.jsx` - Componente principal con todas las secciones del sitio
- `src/index.css` - Estilos globales con Tailwind CSS
- `src/main.jsx` - Punto de entrada de la aplicación
- `public/` - Archivos estáticos
- `index.html` - Plantilla HTML principal

## Secciones del sitio

- **Topbar** - Información de contacto y redes sociales
- **Navbar** - Navegación principal
- **Hero** - Sección principal con llamada a la acción
- **Catálogo** - Categorías de productos
- **Servicios** - Servicios ofrecidos
- **Comunicados** - Blog/artículos
- **CTA** - Llamada a la acción
- **Footer** - Información de contacto y enlaces

## Personalización

El sitio está diseñado para ser fácilmente personalizable. Las secciones contienen texto placeholder que puedes reemplazar con tu contenido real.

## Construcción para producción

Para construir el sitio para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## Troubleshooting

- **Error de Node.js**: Asegúrate de tener la versión correcta de Node.js
- **Dependencias**: Si hay problemas con las dependencias, borra `node_modules` y `package-lock.json`, luego ejecuta `npm install`
- **Puerto ocupado**: Si el puerto 5173 está ocupado, Vite usará automáticamente otro puerto disponible

## Licencia

Este proyecto es privado para Vivero Camuendo.
