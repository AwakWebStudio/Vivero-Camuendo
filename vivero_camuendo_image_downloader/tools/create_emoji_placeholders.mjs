#!/usr/bin/env node
/**
 * Crear placeholders legales usando imágenes de servicios públicos
 * que permiten acceso directo sin bloqueos
 */

import { readFile, writeFile } from 'node:fs/promises';

const CATALOG_PATH = '/workspaces/Vivero-Camuendo/src/catalog.js';

// Mapeo pragmático: productos → imágenes generadas dinámicamente
// Usando servicios que NO bloquean acceso programático
const PRODUCTS_IMAGES = {
  'Naranja': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFA500" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="180" fill="%23FFB84D"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍊%3C/text%3E%3C/svg%3E',
  'Mandarina': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFA500" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="170" fill="%23FFB84D"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍊%3C/text%3E%3C/svg%3E',
  'Durazno': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23E8B4A8" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="180" fill="%23F0C0A0"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍑%3C/text%3E%3C/svg%3E',
  'Manzana': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23DC143C" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="180" fill="%23FF6347"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍎%3C/text%3E%3C/svg%3E',
  'Pera': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2390EE90" width="400" height="400"/%3E%3Cellipse cx="200" cy="220" rx="140" ry="160" fill="%23ADFF2F"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍐%3C/text%3E%3C/svg%3E',
  'Fresa': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFB6C1" width="400" height="400"/%3E%3Cpolygon points="200,50 350,150 300,350 100,350 50,150" fill="%23FF69B4"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍓%3C/text%3E%3C/svg%3E',
  'Tomate cherry': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFB6C1" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="140" fill="%23FF4500"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🍅%3C/text%3E%3C/svg%3E',
  'Papa': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23D3D3D3" width="400" height="400"/%3E%3Cellipse cx="200" cy="200" rx="170" ry="180" fill="%238B7355"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🥔%3C/text%3E%3C/svg%3E',
  'Lechuga': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2390EE90" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="160" fill="%2328A745"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🥬%3C/text%3E%3C/svg%3E',
  'Menta': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2398FF98" width="400" height="400"/%3E%3Cpath d="M200,350 Q100,300 100,150 Q100,80 200,80 Q300,80 300,150 Q300,300 200,350" fill="%2328A745"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🌿%3C/text%3E%3C/svg%3E',
  'Albahaca': 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2390EE90" width="400" height="400"/%3E%3Ccircle cx="200" cy="200" r="150" fill="%2320B2AA"/%3E%3Ctext x="200" y="200" text-anchor="middle" dy=".3em" font-size="80" fill="%23fff" font-family="Arial"%3E🌿%3C/text%3E%3C/svg%3E'
};

async function main() {
  try {
    console.log('🎨 Creando imágenes placeholder con emoji...\n');
    
    let content = await readFile(CATALOG_PATH, 'utf-8');
    
    // Reemplazar URLs de Unsplash por data URIs
    for (const [product, dataUri] of Object.entries(PRODUCTS_IMAGES)) {
      const escapedProduct = product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Buscar y reemplazar URLs de source.unsplash.com por data URIs
      const regex = new RegExp(
        `(title:\\s*"${escapedProduct}"[^}]*image:\\s*)"https://source\\.unsplash\\.com[^"]*"`,
        'g'
      );
      
      const replacement = `$1"${dataUri}"`;
      content = content.replace(regex, replacement);
    }
    
    await writeFile(CATALOG_PATH, content);
    
    console.log('✅ Placeholders creados exitosamente');
    console.log(`\n📊 Productos con imágenes: ${Object.keys(PRODUCTS_IMAGES).length}`);
    console.log('🎨 Tipo: Data URIs con SVG + Emoji');
    console.log('⚡ Ventaja: Cargan instantáneamente sin requests externos');
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
