#!/usr/bin/env node
/**
 * Vivero Camuendo - Descargador de imágenes desde múltiples fuentes legales
 * 
 * Fuentes (en orden de preferencia):
 * 1. Pexels (API gratuita, sin atribución requerida)
 * 2. Unsplash (API gratuita, sin atribución requerida pero apreciada)
 * 3. Pixabay (API gratuita con key, sin atribución requerida)
 * 4. Wikimedia Commons (con atribución obligatoria)
 * 
 * Uso:
 *   node tools/download_images_multisource.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// tools/ -> ../catalog_image_manifest.json  
// tools/ -> ../../src/catalog.js
// tools/ -> ../../public/catalog
const DOWNLOADER_ROOT = path.join(__dirname, '..');  // vivero_camuendo_image_downloader/
const PROJECT_ROOT = path.join(DOWNLOADER_ROOT, '..');  // Vivero-Camuendo/

const MANIFEST_PATH = path.join(DOWNLOADER_ROOT, 'catalog_image_manifest.json');
const ORIGINAL_CATALOG_PATH = path.join(PROJECT_ROOT, 'src', 'catalog.js');
const OUT_ROOT = path.join(PROJECT_ROOT, 'public', 'catalog');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function stripHtml(value = '') {
  return String(value)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Intenta descargar desde Pexels (sin autenticación)
 */
async function fetchFromPexels(term) {
  try {
    const query = new URLSearchParams({ query: term, per_page: 1, page: 1 });
    const response = await fetch(`https://api.pexels.com/v1/search?${query}`, {
      headers: { 'Authorization': 'basic' }
    }).catch(() => null);
    
    if (!response?.ok) return null;
    
    const data = await response.json();
    if (!data.photos?.[0]) return null;
    
    const photo = data.photos[0];
    return {
      url: photo.src.large,
      source: 'pexels',
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      sourceUrl: photo.url,
      license: 'Pexels License (Free)',
      attribution: `Photo by ${photo.photographer} on Pexels`
    };
  } catch (err) {
    return null;
  }
}

/**
 * Intenta descargar desde Unsplash (API abierta)
 */
async function fetchFromUnsplash(term) {
  try {
    const query = new URLSearchParams({ 
      query: term, 
      per_page: 1, 
      orientation: 'landscape' 
    });
    
    const response = await fetch(`https://api.unsplash.com/search/photos?${query}`, {
      headers: { 'Accept-Version': 'v1' }
    }).catch(() => null);
    
    if (!response?.ok) return null;
    
    const data = await response.json();
    if (!data.results?.[0]) return null;
    
    const photo = data.results[0];
    return {
      url: photo.urls.regular,
      source: 'unsplash',
      photographer: photo.user?.name || 'Unknown',
      sourceUrl: photo.links.html,
      license: 'Unsplash License (Free)',
      attribution: `Photo by ${photo.user?.name || 'Unknown'} on Unsplash`
    };
  } catch (err) {
    return null;
  }
}

/**
 * Intenta descargar desde Pixabay (API abierta, búsqueda sin key limitada)
 */
async function fetchFromPixabay(term) {
  try {
    const query = new URLSearchParams({ 
      q: term, 
      per_page: 3,
      image_type: 'photo',
      safesearch: 'true'
    });
    
    const response = await fetch(`https://pixabay.com/api/?${query}`).catch(() => null);
    
    if (!response?.ok) return null;
    
    const data = await response.json();
    if (!data.hits?.[0]) return null;
    
    const image = data.hits[0];
    return {
      url: image.largeImageURL,
      source: 'pixabay',
      photographer: image.user || 'Unknown',
      sourceUrl: image.pageURL,
      license: 'Pixabay License (Free)',
      attribution: `Image by ${image.user || 'Unknown'} on Pixabay`
    };
  } catch (err) {
    return null;
  }
}

/**
 * Descarga una imagen desde una URL
 */
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ViveroCamuendo/1.0)'
      }
    });
    
    if (!response.ok) return false;
    
    const buffer = await response.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`  Error descargando ${url}:`, err.message);
    return false;
  }
}

/**
 * Busca imagen para un término desde múltiples fuentes
 */
async function findImage(term, category) {
  console.log(`[Buscando] ${term}...`);
  
  // Intentar en orden de preferencia
  let result = await fetchFromPexels(term);
  if (result) {
    console.log(`  ✓ Encontrado en Pexels`);
    return result;
  }
  
  await sleep(200); // Rate limiting
  
  result = await fetchFromUnsplash(term);
  if (result) {
    console.log(`  ✓ Encontrado en Unsplash`);
    return result;
  }
  
  await sleep(200);
  
  result = await fetchFromPixabay(term);
  if (result) {
    console.log(`  ✓ Encontrado en Pixabay`);
    return result;
  }
  
  console.log(`  ✗ No encontrado`);
  return null;
}

/**
 * Genera nombre de archivo seguro
 */
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

/**
 * Carga el catálogo original
 */
async function loadOriginalCatalog() {
  try {
    const content = await readFile(ORIGINAL_CATALOG_PATH, 'utf-8');
    
    // Intentar export const categoryData = [...]
    let match = content.match(/export\s+const\s+categoryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
      return eval('(' + match[1] + ')');
    }
    
    // Intentar export default [...]
    match = content.match(/export\s+default\s+(\[[\s\S]*?\]);/);
    if (match) {
      return eval('(' + match[1] + ')');
    }
  } catch (err) {
    console.error('Error cargando catálogo original:', err.message);
  }
  return [];
}

/**
 * Principal
 */
async function main() {
  try {
    // Crear directorios
    await mkdir(OUT_ROOT, { recursive: true });
    
    console.log('📥 Vivero Camuendo - Descargador de imágenes multi-fuente\n');
    
    // Cargar catálogo
    const catalog = await loadOriginalCatalog();
    if (!catalog.length) {
      console.error('❌ No se pudo cargar el catálogo');
      process.exit(1);
    }
    
    console.log(`📦 Catálogo cargado: ${catalog.length} categorías\n`);
    
    // Recolectar todas las búsquedas
    const searches = [];
    const attributions = [];
    const failed = [];
    
    for (const category of catalog) {
      const categoryDir = sanitizeFilename(category.name);
      
      for (const product of category.products || []) {
        searches.push({
          term: product.title,
          category: categoryDir,
          product: product
        });
      }
    }
    
    console.log(`🔍 Buscando ${searches.length} imágenes...\n`);
    
    let downloaded = 0;
    
    for (let i = 0; i < searches.length; i++) {
      const { term, category, product } = searches[i];
      const index = i + 1;
      
      process.stdout.write(`[${index}/${searches.length}] `);
      
      // Crear directorio de categoría
      const categoryPath = path.join(OUT_ROOT, category);
      await mkdir(categoryPath, { recursive: true }).catch(() => {});
      
      // Buscar imagen
      const imageData = await findImage(term, category);
      
      if (imageData) {
        const filename = sanitizeFilename(term) + '.jpg';
        const filepath = path.join(categoryPath, filename);
        const relPath = `/catalog/${category}/${filename}`;
        
        const success = await downloadImage(imageData.url, filepath);
        
        if (success) {
          console.log(`  ✓ Guardado en ${relPath}`);
          downloaded++;
          
          attributions.push({
            filename: relPath,
            term: term,
            source: imageData.source,
            photographer: imageData.photographer || 'Unknown',
            sourceUrl: imageData.sourceUrl,
            license: imageData.license,
            attribution: imageData.attribution,
            downloadedAt: new Date().toISOString()
          });
          
          // Actualizar producto con ruta de imagen
          product.image = relPath;
        } else {
          failed.push({ term, reason: 'Descarga fallida', source: imageData.source });
        }
      } else {
        failed.push({ term, reason: 'No encontrada en fuentes', source: 'none' });
      }
      
      // Rate limiting
      if ((i + 1) % 5 === 0) {
        await sleep(500);
      }
    }
    
    // Generar archivos de salida
    console.log(`\n✅ Descargadas: ${downloaded}/${searches.length}`);
    console.log(`❌ Fallidas: ${failed.length}`);
    
    // Guardar atribuciones JSON
    const attributionsPath = path.join(OUT_ROOT, 'ATTRIBUTIONS.json');
    await writeFile(attributionsPath, JSON.stringify(attributions, null, 2));
    console.log(`\n📝 Atribuciones guardadas en: ${attributionsPath}`);
    
    // Guardar atribuciones Markdown
    const attributionsMd = [
      '# Atribuciones de imágenes',
      '',
      'Todas las imágenes utilizadas en Vivero Camuendo están disponibles bajo licencias libres.',
      '',
      ...attributions.map(attr => 
        `- **${attr.term}** - ${attr.attribution} ([${attr.source}](${attr.sourceUrl})) - ${attr.license}`
      ),
      ''
    ].join('\n');
    
    const attributionsMdPath = path.join(OUT_ROOT, 'ATTRIBUTIONS.md');
    await writeFile(attributionsMdPath, attributionsMd);
    console.log(`📄 Markdown guardado en: ${attributionsMdPath}`);
    
    // Guardar catálogo generado
    const generatedCatalog = `// Auto-generado por download_images_multisource.mjs
// ${new Date().toISOString()}

export const categoryData = ${JSON.stringify(catalog, null, 2)};
`;
    
    const generatedPath = path.join(path.dirname(ORIGINAL_CATALOG_PATH), 'catalog.generated.js');
    await writeFile(generatedPath, generatedCatalog);
    console.log(`🎯 Catálogo generado en: ${generatedPath}`);
    
    // Guardar lista de fallidos
    if (failed.length > 0) {
      const failedPath = path.join(OUT_ROOT, 'FAILED.json');
      await writeFile(failedPath, JSON.stringify(failed, null, 2));
      console.log(`⚠️  Fallidos guardados en: ${failedPath}`);
    }
    
    console.log('\n✨ ¡Descarga completada!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
