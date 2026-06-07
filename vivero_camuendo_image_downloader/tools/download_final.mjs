#!/usr/bin/env node
/**
 * Descargador final - Búsqueda de imágenes legales desde Wikimedia Commons
 * con estrategia de búsqueda optimizada
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOWNLOADER_ROOT = path.join(__dirname, '..');
const PROJECT_ROOT = path.join(DOWNLOADER_ROOT, '..');

const ORIGINAL_CATALOG_PATH = path.join(PROJECT_ROOT, 'src', 'catalog.js');
const OUT_ROOT = path.join(PROJECT_ROOT, 'public', 'catalog');

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';
const USER_AGENT = 'ViveroCamuendoBot/1.0';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function stripHtml(html = '') {
  return String(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Busca imágenes en Wikimedia Commons
 */
async function searchWikimedia(term) {
  try {
    // Limpiar términos
    let query = term.split('(')[0].trim().toLowerCase();
    
    // Intentos progresivos de búsqueda
    const attempts = [
      { q: query, srlimit: 50 },
      { q: query + ' plant', srlimit: 30 },
      { q: query + ' flower', srlimit: 30 },
      { q: query + ' fruit', srlimit: 30 },
      { q: query.split(' ')[0], srlimit: 20 } // Solo primera palabra
    ];
    
    for (const attempt of attempts) {
      const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: attempt.q,
        srlimit: attempt.srlimit,
        srnamespace: 6 // File namespace
      });
      
      const response = await fetch(`${COMMONS_API}?${params}`, {
        headers: { 'User-Agent': USER_AGENT }
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      const results = data.query?.search || [];
      
      if (!results.length) continue;
      
      // Intentar obtener detalles de cada resultado
      for (const result of results.slice(0, 5)) {
        const details = await getFileUrl(result.title);
        if (details) return details;
        await sleep(100);
      }
    }
    
    return null;
  } catch (err) {
    console.error(`  Error en búsqueda:`, err.message);
    return null;
  }
}

/**
 * Obtiene URL descargable de un archivo
 */
async function getFileUrl(filename) {
  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: filename,
      prop: 'imageinfo|pageterms',
      iiprop: 'url|size|mime|mediatype',
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
    const meta = info.extmetadata || {};
    
    // Validar licencia
    const licenseShort = stripHtml(meta.LicenseShortName?.value || '').toLowerCase();
    const license = stripHtml(meta.License?.value || '').toLowerCase();
    const combined = [licenseShort, license].join(' ');
    
    const isLegal = 
      combined.includes('public domain') || 
      combined.includes('cc0') || 
      combined.includes('cc by') ||
      combined.includes('cc-by');
    
    if (!isLegal) return null;
    
    // Validar tipo MIME
    const mime = info.mime || '';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime)) {
      return null;
    }
    
    // Validar tamaño (entre 50KB y 10MB)
    const size = info.size || 0;
    if (size < 50000 || size > 10000000) {
      return null;
    }
    
    const artist = stripHtml(meta.Artist?.value || meta.Author?.value || 'Unknown');
    
    return {
      url: info.url,
      title: filename,
      artist: artist,
      license: licenseShort || 'CC0 / Public Domain',
      description: stripHtml(meta.ImageDescription?.value || '').substring(0, 200),
      size: size
    };
  } catch (err) {
    return null;
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' },
      timeout: 15000
    });
    
    if (!response.ok) return false;
    
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 5000) return false;
    
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
    console.error('Error cargando:', err.message);
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
    
    console.log('🌿 Descargador de imágenes - Vivero Camuendo\n');
    
    const catalog = await loadOriginalCatalog();
    if (!catalog.length) {
      console.error('❌ Error cargando catálogo');
      process.exit(1);
    }
    
    console.log(`📦 Procesando ${catalog.length} categorías\n`);
    
    const searches = [];
    for (const category of catalog) {
      const categoryDir = sanitizeFilename(category.name);
      for (const product of category.products || []) {
        searches.push({ term: product.title, category: categoryDir, product });
      }
    }
    
    console.log(`🔍 Buscando ${searches.length} imágenes...\n`);
    
    const attributions = [];
    const failed = [];
    let downloaded = 0;
    
    for (let i = 0; i < searches.length; i++) {
      const { term, category, product } = searches[i];
      const progress = `[${String(i + 1).padStart(2)}/${searches.length}]`;
      process.stdout.write(`${progress} ${term.substring(0, 32).padEnd(32)} `);
      
      const categoryPath = path.join(OUT_ROOT, category);
      await mkdir(categoryPath, { recursive: true }).catch(() => {});
      
      // Buscar imagen
      const imageData = await searchWikimedia(term);
      
      if (imageData) {
        const filename = sanitizeFilename(term) + '.jpg';
        const filepath = path.join(categoryPath, filename);
        const relPath = `/catalog/${category}/${filename}`;
        
        if (await downloadImage(imageData.url, filepath)) {
          console.log('✓');
          downloaded++;
          product.image = relPath;
          attributions.push({
            term: term,
            image: relPath,
            source: 'Wikimedia Commons',
            creator: imageData.artist,
            license: imageData.license,
            file: imageData.title
          });
        } else {
          console.log('✗ (descarga falló)');
          failed.push(term);
        }
      } else {
        console.log('✗ (no encontrada)');
        failed.push(term);
      }
      
      // Rate limiting
      if ((i + 1) % 5 === 0) {
        await sleep(500);
      }
    }
    
    console.log(`\n📊 Resultados:`);
    console.log(`  ✅ Descargadas: ${downloaded}/${searches.length}`);
    console.log(`  ❌ Fallidas: ${failed.length}`);
    
    // Guardar archivos
    const attributionsPath = path.join(OUT_ROOT, 'ATTRIBUTIONS.json');
    await writeFile(attributionsPath, JSON.stringify(attributions, null, 2));
    
    const attributionsMd = [
      '# Atribuciones de imágenes',
      '',
      `Total descargadas: **${downloaded}**`,
      '',
      '## Créditos',
      '',
      '- **Fuente**: Wikimedia Commons',
      '- **Licencias**: CC0, CC BY, CC BY-SA, Public Domain',
      '- **Descargadas**: ' + new Date().toLocaleDateString('es-ES'),
      '',
      '## Galería de imágenes',
      '',
      ...attributions.map(a => 
        `- **${a.term}** - ${a.creator} - ${a.license}`
      ),
      ''
    ].join('\n');
    
    await writeFile(path.join(OUT_ROOT, 'ATTRIBUTIONS.md'), attributionsMd);
    
    // Guardar catálogo generado
    const generatedCatalog = `// Auto-generado - ${new Date().toISOString()}
// Catálogo con URLs de imágenes descargadas

export const categoryData = ${JSON.stringify(catalog, null, 2)};
`;
    
    await writeFile(
      path.join(path.dirname(ORIGINAL_CATALOG_PATH), 'catalog.generated.js'),
      generatedCatalog
    );
    
    if (failed.length > 0) {
      await writeFile(
        path.join(OUT_ROOT, 'FAILED.json'),
        JSON.stringify(failed, null, 2)
      );
    }
    
    console.log('\n✨ ¡Completado!');
    console.log(`📁 Imágenes: ${OUT_ROOT}`);
    console.log(`📝 Créditos: ${attributionsPath}`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
