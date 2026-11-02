// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string }
/** Línea del horario. En la sección `horario`: una clase (dia, hora, clase, profesor). En otras: dia + horas. */
export interface Horario { dia: string; horas?: string; hora?: string; clase?: string; profesor?: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string; hora?: string; categoria?: string; imagen?: string }
/** Clase de la sección `clases`. Todo escalar; vacío = no se muestra. */
export interface Clase {
  nombre: string;
  texto: string;
  nivel: string;      // «Todos los niveles», «Intermedio»
  duracion: string;   // «60 min»
  imagen: string;
}
/** Tarifa de la sección `tarifas`. Precio siempre cadena; `incluye` separado por «;». */
export interface Tarifa {
  nombre: string;
  texto: string;
  precio: string;      // «14 €», «Consultar»; vacío = no se muestra
  periodo: string;     // «al mes», «la clase»
  incluye: string;     // «Cualquier clase; Esterilla y material»
  destacado: boolean;
}

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  clases: Clase[];
  tarifas: Tarifa[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function clase(e: Crudo): Clase {
  return {
    nombre: texto(e.nombre || e.titulo),
    texto: texto(e.texto),
    nivel: texto(e.nivel),
    duracion: texto(e.duracion),
    imagen: texto(e.imagen),
  };
}

function tarifa(e: Crudo): Tarifa {
  return {
    nombre: texto(e.nombre || e.titulo),
    texto: texto(e.texto),
    precio: texto(e.precio),
    periodo: texto(e.periodo),
    incluye: texto(e.incluye),
    destacado: e.destacado === true,
  };
}

const horario = (h: Crudo): Horario => ({
  dia: texto(h.dia),
  horas: texto(h.horas),
  hora: texto(h.hora),
  clase: texto(h.clase),
  profesor: texto(h.profesor),
});

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Crudo>(s.horario).map(horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    clases: lista<Crudo>(s.clases).map(clase),
    tarifas: lista<Crudo>(s.tarifas).map(tarifa),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#44584a', acento: '#c9785b', fondo: '#f1e9dc', texto: '#2b2925', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'LocalBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** Valores de una cadena separada por «;» o saltos de línea («Wifi; Café» → ['Wifi', 'Café']). */
export const valores = (t?: string) => (t ? String(t).split(/\s*[;\n]\s*/).map((v) => v.trim()).filter(Boolean) : []);
/** Texto de un campo libre (vacío si no es texto ni número). */
export const cadena = (v: unknown) => (typeof v === 'string' || typeof v === 'number' ? String(v).trim() : '');
/** Título con su última palabra aparte, para escribirla en cursiva («Respira hondo» → ['Respira ', 'hondo']). */
export const partirTitulo = (t?: string): [string, string] => {
  const limpio = (t ?? '').trim();
  const i = limpio.lastIndexOf(' ');
  return i > 0 ? [limpio.slice(0, i + 1), limpio.slice(i + 1)] : ['', limpio];
};
/** Número de orden con dos cifras (0 → «01»). */
export const indice = (i: number) => String(i + 1).padStart(2, '0');
