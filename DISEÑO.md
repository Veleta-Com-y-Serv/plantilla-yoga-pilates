# Yoga y pilates: brief de diseño

Plantilla `yoga-pilates` creada el 02/11/2026 a partir de `coworking-espacios` con `php artisan plantillas:nueva`
(tercera tanda «ancho completo», orden 540). De la base solo queda la estructura técnica; el diseño es otro.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: estudios de yoga y pilates, salas de meditación, centros de bienestar y holísticos
  (`sectores`: yoga, pilates, meditacion, bienestar, centro-holistico). Quien entra quiere saber qué clases hay,
  a qué hora, cuánto cuestan y si puede probar.
- **Qué tiene que conseguir la web**: que reserven la primera clase (WhatsApp o formulario) y miren el horario.
- **Tono y estilo** (`estilo: sereno`): tranquilo, luminoso, cálido. Concepto: «luz de mañana en una casa
  mediterránea». Sí: mucho aire dentro de bandas a sangre, serif grande, formas orgánicas. No: tarjetas blancas
  en una caja estrecha, señalética industrial (la base), velos oscuros sobre foto a pantalla completa
  (`psicologia-terapia`), arcos (`belleza-estetica`).
- **Paleta de ejemplo**: primario `#44584a` (verde salvia: horario, contacto, cinta), acento `#c9785b`
  (terracota suave: botones, soles, primera clase, tarifa destacada), fondo `#f1e9dc` (arena), texto `#2b2925`.
  Derivados con `color-mix`: salvia suave (profesores), arena clara (clases, espacio), salvia honda (opiniones,
  pie). Texto sobre primario y acento calculado con `lch(from …)`.
- **Tipografía**: serif de sistema (Iowan Old Style, Palatino, Book Antiqua, Georgia) en peso normal y muy
  grande (títulos 2,75-7 rem), con la última palabra en cursiva y color (`partirTitulo()` en `site.ts`). Texto
  en sans de sistema. Antetítulos en versalitas espaciadas (0,24 em) con un medio sol del acento.
- **Formas**: fotos en «hoja» (dos esquinas opuestas muy redondeadas, alternando), profesores en círculo con aro
  fino del acento, soles (círculos y medios círculos) del acento como decoración, botones en píldora, campos de
  formulario redondeados.
- **Apartados** en orden:
  1. `hero`: partido 50/50; texto sobre arena, foto a sangre a la derecha (arriba, abajo y borde) con esquina de
     hoja y un sol que asoma; cinta salvia deslizante con `items` (frases).
  2. `clases`: rejilla de 3 columnas escalonada (la central baja), fotos 4:5 en hoja, nivel y duración en
     píldoras. Lista `clases` (nombre, texto, nivel, duracion, imagen).
  3. `horario`: banda salvia, una columna por día con la hora en serif. Lista `horario` (dia, hora, clase,
     profesor).
  4. `tarifas`: columnas separadas por líneas finas sobre arena; la destacada, bloque terracota en hoja.
     Lista `tarifas` (nombre, texto, precio, periodo, incluye «;», destacado).
  5. `profesores`: salvia clara, título centrado, 4 columnas (2 en móvil) con fotos en círculo.
  6. `espacio`: mosaico de borde a borde sin márgenes, filas de 2 y 3 (la foto suelta del final, franja entera).
  7. `primera-clase`: 50/50 a sangre, bloque terracota con pasos numerados en cursiva y foto con esquina de hoja.
  8. `opiniones`: salvia honda, primera opinión enorme en cursiva, el resto en columnas.
  9. `preguntas`: arena, título fijo a la izquierda con medio sol de contorno, acordeón con «+» en círculo.
  10. `contacto`: salvia, datos en grande, formulario sobre bloque arena en hoja.
  Pie en salvia honda con el nombre en cursiva enorme.
- **Fotos** (`fotos.json`, 14): sala con luz dorada, material de yoga y pilates (esterillas, bloques, reformer,
  cojines), ventanas con contraventanas, terraza mediterránea; sin personas, sin texto, sin logotipos.
- **Qué no hacer**: volver a fondos carbón, esquinas rectas o monoespaciada (la base); caras en las fotos; más
  de dos colores fuertes por banda.

## Cumplimiento

- `php artisan plantillas:comprobar yoga-pilates --construir`: Cumple (0 errores, 0 avisos).
- Capturas a 375 y 1440 sin scroll horizontal.
- Nota de SEO: la lista `horario` lleva clases (dia, hora) y no horas de apertura, así que el JSON-LD no saca
  `openingHours`; el horario de apertura está en `contacto.horario`.

## Páginas propias (fichas)
Con la misma piel que la portada: cabecera y pie de la plantilla, migas (Inicio › Sección › Elemento), hero con la foto del
elemento (sin foto, su icono), `detalle` en párrafos, tabla de datos, caja de contacto, galería (`imagenes`) y otros elementos
de la misma lista.
