// Actualizá este archivo cuando cambien los precios.
// Los valores se usan en Servicios.jsx y en el schema.org de index.html.

export const PRECIOS = {
  inmobiliaria: [
    { num: '01', nombre: 'BÁSICO',      detalle: '15 fotos',              precio: '$40.000 ARS', valor: 40000 },
    { num: '02', nombre: 'INTERMEDIO',  detalle: '25 fotos + reel',       precio: '$60.000 ARS', valor: 60000 },
    { num: '03', nombre: 'ELITE',       detalle: '35 fotos + reel + copy', precio: '$75.000 ARS', valor: 75000 },
  ],
  cm: [
    { num: '01', nombre: 'BÁSICO',      detalle: '12 posts/mes',           precio: '$60.000 ARS', valor: 60000 },
    { num: '02', nombre: 'INTERMEDIO',  detalle: '20 posts + stories/mes', precio: '$90.000 ARS', valor: 90000 },
    { num: '03', nombre: 'ELITE',       detalle: 'Plan completo mensual',  precio: 'Consultar',   valor: null  },
  ],
  book: {
    precio: '$60.000 ARS',
    valor: 60000,
    detalle: '25/30 fotos editadas · Entrega Drive 48hs',
  },
  ebook: {
    precio: '$9.99 USD',
  },
}
