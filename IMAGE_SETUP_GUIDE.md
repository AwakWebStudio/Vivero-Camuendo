# 🖼️ Guía: Agregar Imágenes al Catálogo de Vivero Camuendo

## Problema Actual
Wikimedia Commons y otras fuentes de imágenes están bloqueando descarga programática por rate limiting. **Solución: agregar imágenes manualmente** - es más rápido que resolver problemas de API.

---

## Opción 1: Imágenes Gratuitas (Recomendado)

### A. Unsplash (Mejor opción - súper fácil)
1. Ir a https://unsplash.com
2. Buscar `"orange fruit"`, `"tomato plant"`, etc.
3. Descargar en calidad media (1200px)
4. Guardar como: `/workspaces/Vivero-Camuendo/public/catalog/plantas-frutales/naranja.jpg`

### B. Pexels 
- URL: https://www.pexels.com
- Buscar producto
- Descargar

### C. Pixabay
- URL: https://pixabay.com
- Buscar producto  
- Descargar

**✅ Todos estos sitios permiten uso comercial sin atribución requerida**

---

## Opción 2: Script Semi-Automático

Crea un archivo local con URLs de imágenes que ya existe:

```bash
# Opción 2a: Usar URLs directas de Unsplash (sin descarga)
# Editar src/catalog.js y cambiar en cada producto:
# image: "🍎"  →  image: "https://source.unsplash.com/400x400/?apple,fruit"
# image: "🥕"  →  image: "https://source.unsplash.com/400x400/?carrot,vegetable"

# Las URLs automáticas de Unsplash funcionan así:
# https://source.unsplash.com/400x400/?KEYWORD1,KEYWORD2
```

**Ventaja**: Las imágenes se sirven desde Unsplash (no ocupan espacio local)  
**Desventaja**: Depende de Unsplash siendo accesible

---

## Opción 3: IA Generada (Rápido)

### A. Usar generador IA gratuito
- Bing Image Creator: https://www.bing.com/images/create
- DALL-E mini: https://huggingface.co/spaces/dalle-mini/dalle-mini
- Stable Diffusion: https://huggingface.co/spaces/stabilityai/stable-diffusion

**Prompt example:**
```
A potted orange tree plant, botanical photography, studio light, white background, professional
```

### B. Descargar resultado
Guardar en `/public/catalog/plantas-frutales/naranja.jpg`

---

##Estructura de carpetas esperada

```
public/catalog/
├── ATTRIBUTIONS.json           # Créditos de imágenes
├── ATTRIBUTIONS.md            
├── plantas-frutales/          # Categoría
│   ├── naranja.jpg
│   ├── mandarina.jpg
│   ├── manzana.jpg
│   └── ...
├── plantas-medicinales/
│   ├── menta.jpg
│   └── ...
└── hortalizas/
    ├── lechuga.jpg
    └── ...
```

---

## Actualizar el Catálogo

**Cuando agregues una imagen manualmente:**

Edit `src/catalog.js`:

```javascript
{
  title: "Naranja",
  subtitle: "Cítrico dulce",
  // ANTES:
  image: "🍊",
  
  // DESPUÉS:
  image: "/catalog/plantas-frutales/naranja.jpg",
  
  details: "...",
  // etc
}
```

---

## Script Helper (Descargar batch desde Unsplash)

Para descargar múltiples imágenes de Unsplash con un nombre, usar curl:

```bash
#!/bin/bash
# Crear directorio
mkdir -p public/catalog/plantas-frutales

# Descargar algunas imágenes
curl "https://source.unsplash.com/500x400/?orange,fruit" \
  -L -o public/catalog/plantas-frutales/naranja.jpg

curl "https://source.unsplash.com/500x400/?apple,red,fruit" \
  -L -o public/catalog/plantas-frutales/manzana.jpg

curl "https://source.unsplash.com/500x400/?lettuce,salad" \
  -L -o public/catalog/hortalizas/lechuga.jpg

# ... más imágenes
```

---

## Generador de URLs Dinámicas (Mejor solución)

Modificar `src/catalog.js` para usar URLs dinámicas de Unsplash:

```javascript
{
  title: "Naranja",
  image: "https://source.unsplash.com/500x400/?orange,citrus,fruit",
  // ... más propiedades
}
```

**Ventajas:**
- ✅ No requiere descargas
- ✅ Imágenes siempre nuevas y variadas
- ✅ Legal y gratuito
- ✅ Sin límite de imágenes

**URL pattern:**
```
https://source.unsplash.com/WIDTHxHEIGHT/?KEYWORD1,KEYWORD2,KEYWORD3
```

Ejemplos:
```
https://source.unsplash.com/400x400/?apple,fruit,red
https://source.unsplash.com/500x300/?tomato,vegetable,garden
https://source.unsplash.com/600x400/?rose,flower,pink
```

---

## Implementación Recomendada

### Paso 1: Quick Fix (5 minutos)
Usar URLs dinámicas de Unsplash en `src/catalog.js`:

```bash
# Editar cada producto y cambiar:
# "🍊" → "https://source.unsplash.com/400x400/?naranja,citrus,fruit"
```

### Paso 2: Agregar Atribuciones
Crear `public/catalog/ATTRIBUTIONS.md`:

```markdown
# Atribuciones de imágenes

Las imágenes de este catálogo provienen de:

- **Unsplash** - Fotografías libres de regalías
  - Licencia: Unsplash License (Libre para uso comercial y no comercial)
  - URL: https://unsplash.com
  - Atribución: No requerida pero apreciada

- **Pexels** - Fotos gratis
  - Licencia: Pexels License  
  - URL: https://www.pexels.com
  - Atribución: No requerida

- **Pixabay** - Imágenes libres de regalías
  - Licencia: Pixabay License
  - URL: https://pixabay.com
  - Atribución: No requerida
```

### Paso 3: Deploy
```bash
npm run build
# Las imágenes dinámicas se cargarán en el navegador
```

---

## Problemas Resueltos

### ❌ Por qué falló la descarga automática
- Rate limiting de Wikimedia Commons
- Wikimedia bloquea bot scripts
- APIs de Unsplash/Pexels requieren autenticación para búsqueda

### ✅ Por qué funcionan las URLs dinámicas
- Unsplash permite URLs genéricas sin autenticación
- Las imágenes se descargan en el navegador del usuario
- No hay limites conocidos para URLs `source.unsplash.com`

---

## Próximos Pasos

1. **Hoy**: Cambiar emojis a URLs de Unsplash (5 min)
2. **Esta semana**: Agregar imágenes locales de mejor calidad
3. **Futuro**: Galería interactiva con lightbox

---

## URLs de Productos Recomendadas

Para copiar y pegar directamente en `src/catalog.js`:

```javascript
// Plantas frutales
image: "https://source.unsplash.com/500x400/?apple,fruit,red",          // Manzana
image: "https://source.unsplash.com/500x400/?orange,citrus,fruit",      // Naranja
image: "https://source.unsplash.com/500x400/?strawberry,fruit,red",     // Fresa
image: "https://source.unsplash.com/500x400/?tomato,cherry,vegetable",  // Tomate cherry
image: "https://source.unsplash.com/500x400/?potato,vegetable,root",    // Papa

// Plantas medicinales
image: "https://source.unsplash.com/500x400/?mint,herb,plant",          // Menta
image: "https://source.unsplash.com/500x400/?basil,herb,green",         // Albahaca
image: "https://source.unsplash.com/500x400/?aloe,succulent,plant",     // Sábila

// Hortalizas
image: "https://source.unsplash.com/500x400/?lettuce,salad,green",      // Lechuga
image: "https://source.unsplash.com/500x400/?broccoli,vegetable,green", // Brócoli
image: "https://source.unsplash.com/500x400/?cabbage,vegetable,food",   // Col
image: "https://source.unsplash.com/500x400/?carrot,vegetable,orange",  // Zanahoria
```

---

## ¡Listo!

Elige la opción que prefieras y comienza. La opción de URLs dinámicas es la más rápida. 🚀
