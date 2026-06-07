# Descarga de imágenes libres para Catálogo Vivero Camuendo

Este paquete está preparado para descargar imágenes reales para los productos de tu `catalog.js`.

## Qué hace

- Lee `catalog_image_manifest.json`.
- Busca imágenes en **Wikimedia Commons** usando nombres comunes y científicos.
- Filtra licencias abiertas: **Public Domain, CC0, CC BY, CC BY-SA**.
- Descarga las imágenes en `public/catalog/...`.
- Genera:
  - `public/catalog/ATTRIBUTIONS.json`
  - `public/catalog/ATTRIBUTIONS.md`
  - `public/catalog/FAILED.json`
  - `src/catalog.generated.js`

## Cómo correrlo en tu proyecto

Copia estos archivos/carpetas dentro de tu proyecto:

```bash
catalog_image_manifest.json
tools/download_catalog_images.mjs
src/catalog.js
```

Desde la raíz del proyecto:

```bash
node tools/download_catalog_images.mjs
```

Luego revisa:

```bash
public/catalog/ATTRIBUTIONS.md
public/catalog/FAILED.json
src/catalog.generated.js
```

Cuando estés conforme:

```bash
cp src/catalog.generated.js src/catalog.js
```

## Productos detectados

El catálogo subido contiene **62 productos** distribuidos así:

- Plantas frutales: 21
- Plantas medicinales / aromáticas: 11
- Plantas nativas: 4
- Plantas ornamentales (flores): 8
- Cactus: 1
- Plantas de jardín / decoración exterior: 4
- Hortalizas: 13

## Revisión manual recomendada

Estos productos tienen nombres comunes ambiguos y conviene revisar visualmente la imagen descargada antes de publicar:

- **Guayabilla**: Nombre local: confirmar especie antes de publicar si se requiere exactitud botánica.
- **Cedro**: Nombre ambiguo: puede referirse a Cedrela odorata u otra especie local.
- **Dulcamara**: Puede ser tóxica y el nombre común varía; revisar imagen seleccionada.
- **Laurel**: En categoría nativa se asumió Cordia alliodora, no Laurus nobilis culinario.
- **Dormilonas**: El catálogo dice subtítulo 'Victoria regia', pero dormilona normalmente se usa para Mimosa pudica. Revisar manualmente.
- **Tocte (nogal / nuez)**: Se asumió Juglans neotropica / nogal andino.

## Nota legal práctica

Las imágenes libres pueden requerir atribución. No borres `ATTRIBUTIONS.md` ni `ATTRIBUTIONS.json`; esos archivos son tu respaldo de autor, fuente y licencia.
