#!/usr/bin/env node
/**
 * Vivero Camuendo - descargador de imágenes libres desde Wikimedia Commons.
 *
 * Uso:
 *   node tools/download_catalog_images.mjs
 *
 * Resultado:
 *   public/catalog/...                imágenes descargadas
 *   public/catalog/ATTRIBUTIONS.json  metadatos/licencias
 *   public/catalog/ATTRIBUTIONS.md    atribuciones legibles
 *   src/catalog.generated.js          catálogo con rutas locales en image
 *
 * Requisitos:
 *   Node 18+ (usa fetch nativo)
 *
 * Criterio:
 *   - Usa Wikimedia Commons porque cada archivo trae página de descripción y licencia.
 *   - Filtra Public Domain, CC0, CC BY y CC BY-SA.
 *   - Evita NonCommercial, NoDerivatives y fair use.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, 'catalog_image_manifest.json');
const ORIGINAL_CATALOG_PATH = path.join(ROOT, 'src', 'catalog.js');
const OUT_ROOT = path.join(ROOT, 'public');
const API = 'https://commons.wikimedia.org/w/api.php';

const USER_AGENT = 'ViveroCamuendoImageDownloader/1.0 (open-license image attribution tool)';

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

function licenseAllowed(meta) {
  const license = [
    stripHtml(meta?.LicenseShortName?.value || ''),
    stripHtml(meta?.UsageTerms?.value || ''),
    stripHtml(meta?.License?.value || ''),
    stripHtml(meta?.Copyrighted?.value || '')
  ].join(' ').toLowerCase();

  const bad = ['noncommercial', 'non-commercial', 'nc-', 'no derivatives', 'no-derivatives', 'nd-', 'fair use'];
  if (bad.some((term) => license.includes(term))) return false;

  const good = ['public domain', 'cc0', 'cc by', 'cc-by', 'cc by-sa', 'cc-by-sa'];
  return good.some((term) => license.includes(term));
}

function scoreCandidate(page, item, term) {
  const title = (page.title || '').toLowerCase();
  const meta = page.imageinfo?.[0]?.extmetadata || {};
  const desc = [
    title,
    stripHtml(meta.ImageDescription?.value || ''),
    stripHtml(meta.ObjectName?.value || '')
  ].join(' ').toLowerCase();

  let score = 0;
  const words = term.toLowerCase().split(/\s+/).filter(Boolean);
  for (const word of words) {
    if (word.length > 3 && desc.includes(word)) score += 2;
  }
  if (title.endsWith('.jpg') || title.endsWith('.jpeg')) score += 2;
  if (title.includes('plant') || title.includes('tree') || title.includes('fruit') || title.includes('flower')) score += 2;
  if (title.includes('logo') || title.includes('icon') || title.includes('map') || title.includes('diagram')) score -= 10;
  const width = page.imageinfo?.[0]?.thumbwidth || page.imageinfo?.[0]?.width || 0;
  if (width >= 700) score += 2;
  return score;
}

async function commonsSearch(term) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: '12',
    gsrsearch: `filetype:bitmap ${term}`,
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1200',
    format: 'json',
    origin: '*'
  });

  const response = await fetch(`${API}?${params}`, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Commons API error ${response.status} for term: ${term}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {});
}

async function findImage(item) {
  for (const term of item.searchTerms) {
    const pages = await commonsSearch(term);
    const candidates = pages
      .filter((p) => p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url)
      .filter((p) => licenseAllowed(p.imageinfo?.[0]?.extmetadata || {}))
      .map((p) => ({ page: p, score: scoreCandidate(p, item, term), term }))
      .sort((a, b) => b.score - a.score);

    if (candidates.length) return candidates[0];
    await sleep(300);
  }
  return null;
}

function extensionFromMime(mime = '', url = '') {
  const lower = `${mime} ${url}`.toLowerCase();
  if (lower.includes('image/png') || lower.endsWith('.png')) return 'png';
  if (lower.includes('image/webp') || lower.endsWith('.webp')) return 'webp';
  if (lower.includes('image/gif') || lower.endsWith('.gif')) return 'gif';
  return 'jpg';
}

async function downloadBinary(url, filepath) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Download error ${response.status}: ${url}`);
  const arrayBuffer = await response.arrayBuffer();
  await mkdir(path.dirname(filepath), { recursive: true });
  await writeFile(filepath, Buffer.from(arrayBuffer));
}

function attributionFromCandidate(item, candidate, localPath) {
  const info = candidate.page.imageinfo[0];
  const meta = info.extmetadata || {};
  const filePage = info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(candidate.page.title.replace(/ /g, '_'))}`;

  return {
    category: item.category,
    title: item.title,
    subtitle: item.subtitle,
    localPath,
    source: 'Wikimedia Commons',
    fileTitle: candidate.page.title,
    filePage,
    imageUrl: info.url,
    downloadedUrl: info.thumburl || info.url,
    author: stripHtml(meta.Artist?.value || meta.Credit?.value || meta.Author?.value || 'Unknown'),
    credit: stripHtml(meta.Credit?.value || ''),
    license: stripHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || 'Unknown'),
    licenseUrl: meta.LicenseUrl?.value || '',
    searchTermUsed: candidate.term,
    manualReviewNote: item.manualReviewNote || ''
  };
}

function replaceImagesInCatalog(originalCatalog, attributions) {
  let generated = originalCatalog;

  for (const attr of attributions) {
    const escapedTitle = attr.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const productRegex = new RegExp(`(\\{\\s*title:\\s*"${escapedTitle}"[\\s\\S]*?image:\\s*)"[^"]*"`, 'm');
    generated = generated.replace(productRegex, `$1"${attr.localPath}"`);
  }

  generated = generated.replace(
    /export const categoryData =/,
    '// Generated by tools/download_catalog_images.mjs\nexport const categoryData ='
  );

  return generated;
}

function mdEscape(s = '') {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const originalCatalog = await readFile(ORIGINAL_CATALOG_PATH, 'utf8');

  const attributions = [];
  const failed = [];

  console.log(`Buscando y descargando ${manifest.length} imágenes desde Wikimedia Commons...\n`);

  for (const [index, item] of manifest.entries()) {
    process.stdout.write(`[${index + 1}/${manifest.length}] ${item.title}... `);

    try {
      const candidate = await findImage(item);
      if (!candidate) {
        console.log('NO ENCONTRADA');
        failed.push({ title: item.title, category: item.category, searchTerms: item.searchTerms, reason: 'No open-license bitmap candidate found' });
        continue;
      }

      const info = candidate.page.imageinfo[0];
      const downloadUrl = info.thumburl || info.url;
      const ext = extensionFromMime(info.thumbmime || info.mime, downloadUrl);
      const localPath = `/${item.localBasePath}.${ext}`;
      const absolutePath = path.join(OUT_ROOT, `${item.localBasePath}.${ext}`);

      await downloadBinary(downloadUrl, absolutePath);
      attributions.push(attributionFromCandidate(item, candidate, localPath));
      console.log(`OK → ${localPath}`);
      await sleep(500);
    } catch (error) {
      console.log('ERROR');
      failed.push({ title: item.title, category: item.category, searchTerms: item.searchTerms, reason: error.message });
    }
  }

  const attrDir = path.join(OUT_ROOT, 'catalog');
  await mkdir(attrDir, { recursive: true });
  await writeFile(path.join(attrDir, 'ATTRIBUTIONS.json'), JSON.stringify(attributions, null, 2), 'utf8');
  await writeFile(path.join(attrDir, 'FAILED.json'), JSON.stringify(failed, null, 2), 'utf8');

  const md = [
    '# Atribuciones de imágenes - Catálogo Vivero Camuendo',
    '',
    'Imágenes descargadas desde Wikimedia Commons. Verifica manualmente los ítems marcados como ambiguos antes de publicar.',
    '',
    '| Producto | Archivo local | Autor / crédito | Licencia | Fuente | Nota |',
    '|---|---|---|---|---|---|',
    ...attributions.map((a) =>
      `| ${mdEscape(a.title)} | \`${mdEscape(a.localPath)}\` | ${mdEscape(a.author || a.credit)} | ${mdEscape(a.license)} | ${mdEscape(a.filePage)} | ${mdEscape(a.manualReviewNote)} |`
    ),
    '',
    failed.length ? '## Imágenes no descargadas automáticamente' : '',
    ...failed.map((f) => `- **${f.title}** (${f.category}): ${f.reason}. Búsquedas usadas: ${f.searchTerms.join(' / ')}`)
  ].filter(Boolean).join('\n');

  await writeFile(path.join(attrDir, 'ATTRIBUTIONS.md'), md, 'utf8');

  const generatedCatalog = replaceImagesInCatalog(originalCatalog, attributions);
  await writeFile(path.join(ROOT, 'src', 'catalog.generated.js'), generatedCatalog, 'utf8');

  console.log('\nListo.');
  console.log(`Descargadas: ${attributions.length}`);
  console.log(`Pendientes/revisión: ${failed.length}`);
  console.log('Archivos generados:');
  console.log('- public/catalog/ATTRIBUTIONS.json');
  console.log('- public/catalog/ATTRIBUTIONS.md');
  console.log('- public/catalog/FAILED.json');
  console.log('- src/catalog.generated.js');
  console.log('\nDespués de revisar, puedes reemplazar src/catalog.js con src/catalog.generated.js.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
