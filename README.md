# Plantilla NoExpertise · Yoga y pilates

Web serena a todo el ancho para estudios de yoga, pilates, meditación y centros de bienestar.
Ejemplo: Atalaya Yoga y Pilates, un estudio en el casco antiguo de Cartagena, negocio ficticio.

- Sectores: yoga, pilates, meditacion, bienestar, centro-holistico. Estilo: sereno. Plan mínimo: gratis.
- Secciones: hero, clases, horario, tarifas, profesores, espacio, primera-clase, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Campos propios:
  - `hero.items[]`: frases de la cinta que se desliza bajo la portada (titulo).
  - `clases.clases[]`: nombre, texto, nivel, duracion, imagen.
  - `horario.horario[]`: dia, hora, clase, profesor (se agrupa por día).
  - `tarifas.tarifas[]`: nombre, texto, precio (cadena), periodo, incluye («;»), destacado.
  - `profesores.personas[]`: nombre, cargo, foto, texto.
  - `primera-clase`: `items[]` (pasos: titulo, texto), `imagen`, `cta`, `cta_secundario`.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; fotos a generar en `fotos.json`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de respaldo (`public/placeholders/`) hechas para esta plantilla, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.clases.clases` con `detalle` tiene su página en `/clases/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
