#!/usr/bin/env node
/**
 * Descargar imágenes que FUNCIONAN desde URLs verificadas
 * Wikimedia con URLs directas sin API
 */

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const IMAGES = {
  'plantas-frutales': {
    'naranja.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenDeliciousAppel.jpg/1200px-GoldenDeliciousAppel.jpg',
    'mandarina.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Clementine_oranges.jpg/800px-Clementine_oranges.jpg',
    'durazno.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Peach_Fruit_Cross_Section.jpg/800px-Peach_Fruit_Cross_Section.jpg',
    'manzana.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
    'pera.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Pear_Rocha.jpg/800px-Pear_Rocha.jpg',
    'cereza.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Cherry_Stella444.jpg/800px-Cherry_Stella444.jpg',
    'fresa.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Strawberry_Fragaria_ananassa.jpg/800px-Strawberry_Fragaria_ananassa.jpg',
    'mango.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/800px-Hapus_Mango.jpg',
    'guayaba.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Guava_fruit_for_NRCS.jpg/800px-Guava_fruit_for_NRCS.jpg',
    'tomate-cherry.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg',
    'uva.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Table_grapes_on_white.jpg/800px-Table_grapes_on_white.jpg',
  },
  'plantas-medicinales': {
    'menta.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mentha_spicata_Spearmint.jpg/800px-Mentha_spicata_Spearmint.jpg',
    'albahaca.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Basil-Leaves.jpg/800px-Basil-Leaves.jpg',
    'sabila.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Aloe_vera_flowering.jpg/800px-Aloe_vera_flowering.jpg',
  },
  'hortalizas': {
    'lechuga.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lactuca_sativa_leaf.jpg/800px-Lactuca_sativa_leaf.jpg',
    'brocoli.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Broccoli_and_cross_section.jpg/800px-Broccoli_and_cross_section.jpg',
    'col.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Savoy_cabbage.jpg/800px-Savoy_cabbage.jpg',
    'remolacha.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Beetroot.jpg/800px-Beetroot.jpg',
    'papa.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Potato_and_cross_section.jpg/800px-Potato_and_cross_section.jpg',
    'perejil.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Parsley.jpg/800px-Parsley.jpg',
    'cilantro.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Coriander_leaves.jpg/800px-Coriander_leaves.jpg',
  }
};

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    if (!response.ok) {
      console.error(`  ✗ HTTP ${response.status}`);
      return false;
    }
    
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 5000) {
      console.error(`  ✗ Muy pequeño`);
      return false;
    }
    
    await writeFile(filepath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('📥 Descargando imágenes reales desde Wikimedia...\n');
  
  let downloaded = 0;
  let total = 0;
  
  for (const [category, files] of Object.entries(IMAGES)) {
    const categoryPath = `/workspaces/Vivero-Camuendo/public/catalog/${category}`;
    
    for (const [filename, url] of Object.entries(files)) {
      total++;
      const filepath = path.join(categoryPath, filename);
      process.stdout.write(`[${total}] ${filename.padEnd(20)} `);
      
      if (await downloadImage(url, filepath)) {
        console.log('✓');
        downloaded++;
      }
      
      await sleep(300);
    }
  }
  
  console.log(`\n✅ Descargadas: ${downloaded}/${total}`);
}

main().catch(console.error);
