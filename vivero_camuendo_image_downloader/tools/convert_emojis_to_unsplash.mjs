#!/usr/bin/env node
/**
 * Convertir emojis a URLs dinámicas de Unsplash
 */

import { readFile, writeFile } from 'node:fs/promises';

const CATALOG_PATH = '/workspaces/Vivero-Camuendo/src/catalog.js';

// Mapeo de productos a keywords de Unsplash
const PRODUCT_IMAGES = {
  'Naranja': 'orange,citrus,fruit',
  'Mandarina': 'tangerine,citrus,fruit',
  'Durazno': 'peach,fruit,fuzzy',
  'Manzana': 'apple,fruit,red',
  'Ciruela (Claudia)': 'plum,fruit,purple',
  'Pera': 'pear,fruit,green',
  'Cereza': 'cherry,fruit,red',
  'Guaba': 'legume,fruit,pod',
  'Mango': 'mango,tropical,fruit',
  'Tocte (nogal / nuez)': 'walnut,nut,tree',
  'Naranjilla': 'naranjilla,exotic,fruit',
  'Guayaba': 'guava,tropical,fruit',
  'Guayabilla': 'guava,small,fruit',
  'Fresa': 'strawberry,fruit,red',
  'Frambuesa': 'raspberry,fruit,red',
  'Uva': 'grape,fruit,green',
  'Granadilla': 'passion,fruit,tropical',
  'Tomate de árbol': 'tamarillo,fruit,red',
  'Tomate riñón': 'tomato,vegetable,fruit',
  'Tomate cherry': 'cherry,tomato,small',
  'Chirimoya': 'custard,apple,tropical',
  
  'Ruda': 'rue,herb,plant',
  'Sábila': 'aloe,succulent,plant',
  'Menta': 'mint,herb,green',
  'Cedro': 'cedar,tree,plant',
  'Hierba Luisa': 'lemon,verbena,herb',
  'Toronjil': 'melissa,herb,mint',
  'Albahaca': 'basil,herb,green',
  'Apio': 'celery,herb,vegetable',
  'Dulcamara': 'bittersweet,herb,plant',
  'Orégano orejón': 'oregano,herb,plant',
  'Orégano (normal)': 'oregano,herb,green',
  
  'Cholán': 'cholán,native,tree',
  'Laurel': 'laurel,tree,leaf',
  'Floripondio': 'angel,trumpet,flower',
  'Aliso': 'alder,tree,native',
  
  'Geranios': 'geranium,flower,red',
  'Begonias': 'begonia,flower,pink',
  'Claveles': 'carnation,flower,red',
  'Margaritas': 'daisy,flower,white',
  'Ciclamen': 'cyclamen,flower,pink',
  'Pensamientos': 'pansy,flower,purple',
  'Dormilonas': 'mimosa,sensitive,plant',
  'Clavelina': 'clove,pink,flower',
  
  'Cactus (variedad general)': 'cactus,succulent,desert',
  
  'Duranta': 'duranta,ornamental,plant',
  'Palmeras': 'palm,tree,tropical',
  'Plantas colgantes': 'hanging,plant,vine',
  'Helechos': 'fern,plant,green',
  
  'Lechuga': 'lettuce,salad,green',
  'Col': 'cabbage,vegetable,green',
  'Brócoli': 'broccoli,vegetable,green',
  'Remolacha': 'beet,vegetable,red',
  'Cebolla larga': 'scallion,vegetable,green',
  'Cebolla paiteña': 'onion,vegetable,red',
  'Alfalfa': 'alfalfa,sprout,plant',
  'Perejil': 'parsley,herb,green',
  'Cilantro': 'cilantro,herb,green',
  'Papa': 'potato,vegetable,root',
  'Nabo': 'turnip,vegetable,root',
  'Nabo chino': 'bok,choy,vegetable'
};

async function main() {
  try {
    console.log('🌿 Convirtiendo emojis a URLs de Unsplash...\n');
    
    let content = await readFile(CATALOG_PATH, 'utf-8');
    
    // Procesar cada producto
    for (const [product, keywords] of Object.entries(PRODUCT_IMAGES)) {
      // Escapar caracteres especiales regex
      const escapedProduct = product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Buscar patrón: "Producto", ... image: "X", ...
      // Cambiar image: "CUALQUIER_EMOJI" por image: "URL"
      const regex = new RegExp(
        `(\\{[^}]*title:\\s*"${escapedProduct}"[^}]*image:\\s*)"[^"]*"`,
        'g'
      );
      
      const replacement = `$1"https://source.unsplash.com/500x400/?${keywords}"`;
      content = content.replace(regex, replacement);
    }
    
    // Guardar
    await writeFile(CATALOG_PATH, content);
    
    console.log('✅ Convertidas todas las imágenes a URLs dinámicas de Unsplash');
    console.log('\n📊 Cambios realizados:');
    console.log(`   - Total de productos: ${Object.keys(PRODUCT_IMAGES).length}`);
    console.log(`   - Fuente: source.unsplash.com (dinámico)`);
    console.log(`   - Legal: Licencia Unsplash (libre comercial)`);
    console.log(`\n✨ El catálogo ahora carga imágenes reales automáticamente`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
