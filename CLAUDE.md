# Plantilla «Yoga y pilates» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **sereno**
(luz de mañana en una casa mediterránea, a todo el ancho). El brief de diseño está en `DISEÑO.md`.
Todo en castellano de España, frases cortas, sin jerga.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (también las listas propias `clases` y `tarifas`, y el `horario` con dia, hora, clase y profesor); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario = verde salvia de las bandas oscuras, acento = terracota de los botones, la banda de primera clase y los soles; fondo = arena; texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). El color del texto sobre el primario y sobre el acento se calcula solo (`--sobre-primario`, `--sobre-acento` en `src/styles/global.css`): aguanta cualquier color del cliente.
- **Tipografías y aspecto general**: `src/styles/global.css` (serif de sistema ligera y enorme; la última palabra de cada título va en cursiva con `partirTitulo()`; antetítulos `.rotulo` en versalitas con un medio sol; bandas `.banda--oscura|honda|acento|clara|blanca|salvia`; fotos en forma de hoja `.hoja`, `.hoja-inv`, `.hoja-peq`; botones en píldora `.btn`/`.btn-sec`; cinta deslizante `.cinta`; cabecera `.cabecera--serena` y pie `.pie--sereno`). Fuentes del sistema: no añadas fuentes externas.
- **Imágenes**: en `public/`. Las fotos del ejemplo van en `public/fotos/` (se generan a partir de `fotos.json`); las de respaldo, en `public/placeholders/` (`Imagen.astro` las muestra si una foto falta). En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Personas: `/placeholders/persona.svg` hasta que el cliente suba la suya.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = círculo salvia con un sol del acento + nombre en serif.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`. Se pintan en el orden en que aparecen en `site.yaml`. Todas son bandas a todo el ancho.
- `hero` → `hero.astro`: portada partida; texto sobre arena a la izquierda y foto a sangre a la derecha con la esquina en hoja y un sol del acento. Debajo, cinta salvia que se desliza con las frases de `items` (titulo).
- `clases` → `clases.astro`: rejilla de 3 columnas con fotos en hoja, nivel y duración en píldoras. Lista `clases` (nombre, texto, nivel, duracion, imagen); si está vacía usa `items` (titulo, texto). `cta` = botón final.
- `horario` → `horario.astro`: banda salvia con una columna por día. Lista `horario` (dia, hora, clase, profesor), agrupada por `dia` en el orden del fichero. `cta` = botón final.
- `tarifas` → `tarifas.astro`: columnas con líneas finas; la `destacado: true` es un bloque terracota. Lista `tarifas` (nombre, texto, precio, periodo, incluye con «;», destacado). `cta` = botón de cada tarifa.
- `profesores` → `profesores.astro`: banda salvia clara con fotos en círculo. `personas` (nombre, cargo, foto, texto).
- `espacio` → `espacio.astro`: cabecera y mosaico de fotos de borde a borde (`galeria`: rutas), en filas de 2 y 3.
- `primera-clase` → `primera-clase.astro`: fila 50/50 a sangre, bloque terracota con pasos (`items`: titulo, texto), `cta`, `cta_secundario` e `imagen`.
- `opiniones` → `opiniones.astro`: banda salvia honda con la primera opinión enorme y el resto en columnas. `testimonios` (texto, autor). Sin opiniones no se pinta.
- `preguntas` → `preguntas.astro`: acordeón `details/summary` sobre arena; sin preguntas no se pinta.
- `contacto` → `contacto.astro`: banda salvia con los datos en grande, botones de llamar y WhatsApp y formulario (día y clase que interesa; las opciones salen de `clases`).
- `texto` → `texto.astro`: apartado genérico (con imagen, 50/50 a sangre; sin imagen, título y texto a todo el ancho).

Iconos disponibles (`items[].icono`): hoja, sol, luna, ola, esterilla, corazon, reloj, calendario, usuarios, nivel, telefono, mapa, correo, estrella, check, flecha (`src/components/ui/Icono.astro`).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, precios, fotos**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }`, ponlo entre comillas. Precios siempre como cadena (`"14 €"`, `"Consultar"`). Horas entre comillas (`hora: "9:00"`).
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Varios valores en un campo: cadena con «;» (`incluye: "Esterilla; Mantas"`). Máximo 24 elementos por lista (el horario también: si hay más clases, quita las menos importantes).
5. **Página nueva**: crea `src/pages/<slug>.astro` usando `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: crea `src/components/secciones/<id>.astro` (copia la estructura de una existente: `seccion(id)`, una banda `banda--…` a todo el ancho y `.contenedor` dentro) y añade `secciones.<id>` en `site.yaml`. `src/pages/index.astro` la recoge sola.
7. **No tocar** `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base (canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio y de las preguntas, robots, sitemap y llms.txt), salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral del texto en móvil (`.contenedor`), sin scroll horizontal, botones de 44 px de alto como mínimo. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`, o el nombre de la ficha); las decorativas, `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.clases.clases` → `/clases/<slug>/` (clase).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio, duración…) salen en la tabla de datos de la ficha.
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/clases/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio/producto con precio si lo hay).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "servicios; planes" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/servicios/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
