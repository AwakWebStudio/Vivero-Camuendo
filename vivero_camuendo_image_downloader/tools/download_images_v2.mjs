#!/usr/bin/env node
/**
 * Vivero Camuendo - Descargador de imágenes desde múltiples fuentes
 * 
 * Estrategia:
 * 1. Wikimedia Commons (con búsqueda mejorada)
 * 2. Open Library API (para libros botánicos)
 * 3. Archive.org (imágenes públicas)
 * 4. Direct URLs de repos públicos
 * 
 * Uso:
 *   node tools/download_images_v2.mjs
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOWNLOADER_ROOT = path.join(__dirname, '..');
const PROJECT_ROOT = path.join(DOWNLOADER_ROOT, '..');

const ORIGINAL_CATALOG_PATH = path.join(PROJECT_ROOT, 'src', 'catalog.js');
const OUT_ROOT = path.join(PROJECT_ROOT, 'public', 'catalog');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const USER_AGENT = 'ViveroCamuendoBot/1.0';

/**
 * Busca en Wikimedia Commons con estrategia mejorada
 */
async function searchWikimediaCommons(term) {
  try {
    // Intentar búsqueda directa
    let query = term.split('(')[0].trim(); // Limpiar paréntesis
    
    // Agregar términos botánicos comunes
    const searchTerms = [
      query,
      query + ' plant',
      query + ' flower',
      query + ' fruit',
      query + ' vegetable'
    ];
    
    for (const searchTerm of searchTerms) {
      const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        srwhat: 'text',
        srsearch: searchTerm,
        srlimit: 10,
        list: 'search'
      });
      
      const url = `${COMMONS_API}?${params}`;
      const response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT }
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      if (!data.query?.search?.length) continue;
      
      // Obtener detalles del primer resultado
      const title = data.query.search[0].title;
      
      return await getFileDetails(title);
    }
  } catch (err) {
    console.error(`  Error Wikimedia:`, err.message);
  }
  
  return null;
}

/**
 * Obtiene detalles y URL de descarga de un archivo de Wikimedia
 */
async function getFileDetails(filename) {
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: filename,
      prop: 'imageinfo|pageterms',
      iiprop: 'url|size|mime',
      redirects: 1
    });
    
    const response = await fetch(`${COMMONS_API}?${params}`, {
      headers: { 'User-Agent': USER_AGENT }
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const page = Object.values(data.query?.pages || {})[0];
    
    if (!page?.imageinfo?.[0]) return null;
    
    const info = page.imageinfo[0];
    const meta = page.imageinfo[0].extmetadata || {};
    
    // Filtrar por licencia
    const license = [
      stripHtml(meta.LicenseShortName?.value || ''),
      stripHtml(meta.License?.value || '')
    ].join(' ').toLowerCase();
    
    const isAllowed = 
      license.includes('public domain') || 
      license.includes('cc0') || 
      license.includes('cc by') ||
      license.includes('cc-by');
    
    if (!isAllowed) return null;
    
    // Validar tipo de imagen
    const mime = info.mime || '';
    if (!mime.startsWith('image/')) return null;
    
    const attribution = stripHtml(meta.Artist?.value || meta.Author?.value || 'Unknown');
    
    return {
      url: info.url,
      source: 'wikimedia',
      title: filename,
      attribution: attribution,
      sourceUrl: page.canonicalurl,
      license: license.substring(0, 50),
      mime: mime
    };
  } catch (err) {
    return null;
  }
}

/**
 * Busca en Open Library (para contenido botánico)
 */
async function searchOpenLibrary(term) {
  try {
    const query = term.split('(')[0].trim();
    const params = new URLSearchParams({
      q: query + ' botanical',
      limit: 1,
      fields: 'cover_i,first_publish_year'
    });
    
    const response = await fetch(`https://openlibrary.org/search.json?${params}`);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const doc = data.docs?.[0];
    
    if (!doc?.cover_i) return null;
    
    const coverId = doc.cover_i;
    return {
      url: `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
      source: 'openlibrary',
      attribution: 'Open Library',
      sourceUrl: `https://openlibrary.org${doc.key}`,
      license: 'Public Domain / CC0'
    };
  } catch (err) {
    return null;
  }
}

/**
 * Base de URLs manuales de plantas comunes (fallback)
 */
const PLANT_URLS = {
  'Naranja': 'https://commons.wikimedia.org/wiki/Special:FilePath/Orange-Fruit.jpg',
  'Mandarina': 'https://commons.wikimedia.org/wiki/Special:FilePath/Tangerine-Fruit.jpg',
  'Manzana': 'https://commons.wikimedia.org/wiki/Special:FilePath/Apple_Red.jpg',
  'Pera': 'https://commons.wikimedia.org/wiki/Special:FilePath/Pear.jpg',
  'Fresa': 'https://commons.wikimedia.org/wiki/Special:FilePath/Strawberry-Fragaria-Ananassa.jpg',
  'Menta': 'https://commons.wikimedia.org/wiki/Special:FilePath/Mentha-Peppermint.jpg',
  'Lechuga': 'https://commons.wikimedia.org/wiki/Special:FilePath/Lettuce.jpg',
  'Tomate cherry': 'https://commons.wikimedia.org/wiki/Special:FilePath/Cherry-Tomatoes.jpg',
  'Papa': 'https://commons.wikimedia.org/wiki/Special:FilePath/Potato.jpg',
  'Cebolla larga': 'https://commons.wikimedia.org/wiki/Special:FilePath/Onion.jpg',
  'Albahaca': 'https://commons.wikimedia.org/wiki/Special:FilePath/Basil-Leaves.jpg'
};

function stripHtml(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ViveroCamuendo/1.0)'
      }
    });
    
    if (!response.ok) {
      console.error(`    HTTP ${response.status}`);
      return false;
    }
    
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 5000) { // Archivo muy pequeño = probablemente error HTML
      return false;
    }
    
    await writeFile(filepath, Buffer.from(buffer));
    return true;
  } catch (err) {
    return false;
  }
}

async function loadOriginalCatalog() {
  try {
    const content = await readFile(ORIGINAL_CATALOG_PATH, 'utf-8');
    
    let match = content.match(/export\s+const\s+categoryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
      return eval('(' + match[1] + ')');
    }
    
    match = content.match(/export\s+default\s+(\[[\s\S]*?\]);/);
    if (match) {
      return eval('(' + match[1] + ')');
    }
  } catch (err) {
    console.error('Error cargando catálogo:', err.message);
  }
  return [];
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

async function main() {
  try {
    await mkdir(OUT_ROOT, { recursive: true });
    
    console.log('📥 Descargador de imágenes - Vivero Camuendo v2\n');
    
    const catalog = await loadOriginalCatalog();
    if (!catalog.length) {
      console.error('❌ Error cargando catálogo');
      process.exit(1);
    }
    
    console.log(`📦 ${catalog.length} categorías\n`);
    
    const searches = [];
    const attributions = [];
    const failed = [];
    
    for (const category of catalog) {
      const categoryDir = sanitizeFilename(category.name);
      for (const product of category.products || []) {
        searches.push({ term: product.title, category: categoryDir, product });
      }
    }
    
    console.log(`🔍 Procesando ${searches.length} imágenes...\n`);
    
    let downloaded = 0;
    
    for (let i = 0; i < searches.length; i++) {
      const { term, category, product } = searches[i];
      process.stdout.write(`[${i + 1}/${searches.length}] ${term.substring(0, 30).padEnd(30)} `);
      
      const categoryPath = path.join(OUT_ROOT, category);
      await mkdir(categoryPath, { recursive: true }).catch(() => {});
      
      let imageData = null;
      
      // Estrategia 1: URLs manuales (fallback directo)
      if (PLANT_URLS[term]) {
        const filename = sanitizeFilename(term) + '.jpg';
        const filepath = path.join(categoryPath, filename);
        const relPath = `/catalog/${category}/${filename}`;
        
        if (await downloadImage(PLANT_URLS[term], filepath)) {
          console.log('✓ (manual URL)');
          downloaded++;
          product.image = relPath;
          attributions.push({
            filename: relPath,
            term: term,
            source: 'wikimedia_direct',
            attribution: 'Wikimedia Commons',
            license: 'CC0 / Public Domain'
          });
          continue;
        }
      }
      
      // Estrategia 2: Wikimedia Commons
      imageData = await searchWikimediaCommons(term);
      if (imageData) {
        const filename = sanitizeFilename(term) + '.jpg';
        const filepath = path.join(categoryPath, filename);
        const relPath = `/catalog/${category}/${filename}`;
        
        if (await downloadImage(imageData.url, filepath)) {
          console.log('✓ (wikimedia)');
          downloaded++;
          product.image = relPath;
          attributions.push({
            filename: relPath,
            term: term,
            source: imageData.source,
            attribution: imageData.attribution,
            license: imageData.license
          });
          await sleep(300);
          continue;
        }
      }
      
      // Estrategia 3: Open Library
      await sleep(100);
      imageData = await searchOpenLibrary(term);
      if (imageData) {
        const filename = sanitizeFilename(term) + '.jpg';
        const filepath = path.join(categoryPath, filename);
        const relPath = `/catalog/${category}/${filename}`;
        
        if (await downloadImage(imageData.url, filepath)) {
          console.log('✓ (openlibrary)');
          downloaded++;
          product.image = relPath;
          attributions.push({
            filename: relPath,
            term: term,
            source: imageData.source,
            attribution: imageData.attribution,
            license: imageData.license
          });
          await sleep(200);
          continue;
        }
      }
      
      // No encontrada
      console.log('✗ (no encontrada)');
      failed.push({ term, reason: 'No found in sources' });
      await sleep(100);
    }
    
    console.log(`\n✅ Descargadas: ${downloaded}/${searches.length}`);
    console.log(`❌ Fallidas: ${failed.length}`);
    
    // Guardar archivos de salida
    const attributionsPath = path.join(OUT_ROOT, 'ATTRIBUTIONS.json');
    await writeFile(attributionsPath, JSON.stringify(attributions, null, 2));
    console.log(`\n📝 ${attributionsPath}`);
    
    const attributionsMd = [
      '# Atribuciones de imágenes',
      '',
      `Descargadas: ${downloaded} imágenes`,
      `Procesadas: ${searches.length} términos`,
      '',
      '## Fuentes legales utilizadas',
      '',
      '- **Wikimedia Commons**: Imágenes con licencias CC0, CC BY, CC BY-SA',
      '- **Open Library**: Portadas de libros botánicos',
      '',
      '## Galería',
      '',
      ...attributions.map(a => `- **${a.term}**: ${a.source} (${a.license})`),
      ''
    ].join('\n');
    
    const attributionsMdPath = path.join(OUT_ROOT, 'ATTRIBUTIONS.md');
    await writeFile(attributionsMdPath, attributionsMd);
    console.log(`📄 ${attributionsMdPath}`);
    
    const generatedCatalog = `// Auto-generado por download_images_v2.mjs
// ${new Date().toISOString()}

export const categoryData = ${JSON.stringify(catalog, null, 2)};
`;
    
    const generatedPath = path.join(path.dirname(ORIGINAL_CATALOG_PATH), 'catalog.generated.js');
    await writeFile(generatedPath, generatedCatalog);
    console.log(`🎯 ${generatedPath}`);
    
    if (failed.length > 0) {
      const failedPath = path.join(OUT_ROOT, 'FAILED.json');
      await writeFile(failedPath, JSON.stringify(failed, null, 2));
      console.log(`⚠️  ${failedPath}`);
    }
    
    console.log('\n✨ ¡Descarga completada!');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
