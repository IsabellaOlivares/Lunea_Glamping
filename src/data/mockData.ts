import type { Item } from '../types';

export const ITEMS: Item[] = [
  { id: '1', name: 'Lunea Romance', description: 'Cena romántica, fogata, desayuno, decoración', category: 'Alojamiento', price: 380000, priceUnit: 'por noche', details: 'Pareja' },
  { id: '2', name: 'Lunea Amigos', description: 'Fogata grupal, caminata ecológica, juegos, cine bajo las estrellas', category: 'Alojamiento', price: 450000, priceUnit: 'por noche', details: 'Hasta 4 personas' },
  { id: '3', name: 'Lunea Familia', description: 'Desayuno familiar, caminata ecológica, juegos, fogata', category: 'Alojamiento', price: 520000, priceUnit: 'por noche', details: 'Hasta 5 personas' },
  { id: '4', name: 'Lunea Noche Especial', description: 'Domo premium, jacuzzi privado, cena especial, decoración personalizada', category: 'Alojamiento', price: 600000, priceUnit: 'por noche', details: 'Pareja' },
  { id: '5', name: 'Masaje Relajante', description: 'Masaje cuerpo completo en espacio privado y tranquilo', category: 'Actividad', price: 80000, priceUnit: 'por persona', details: 'Duración aprox. 60 min' },
  { id: '6', name: 'Paseo en Kayak', description: 'Incluye kayak y elementos de seguridad', category: 'Actividad', price: 60000, priceUnit: 'por persona', details: 'Recorrido aprox. 60 min' },
  { id: '7', name: 'Taller de Pizza', description: 'Cada persona hornea y prepara su propia pizza', category: 'Actividad', price: 50000, priceUnit: 'por persona', details: 'Incluye ingredientes' },
  { id: '8', name: 'Sesión de Fotografía', description: 'Fotógrafo y recorrido por los espacios del lugar, entrega digital', category: 'Actividad', price: 100000, priceUnit: 'sesión', details: 'Duración 60 min' },
  { id: '9', name: 'Paseo a Caballo', description: 'Recorrido guiado por senderos, incluye equipo básico de seguridad', category: 'Actividad', price: 50000, priceUnit: 'por persona', details: 'Duración aprox. 60 min' },
  { id: '10', name: 'Taller de Pintura', description: 'Lienzo, pinturas, pinceles y un instructor. Te puedes llevar tu obra', category: 'Actividad', price: 40000, priceUnit: 'por persona', details: 'Duración 1h 30min' },
];

export const FAVORITES: Item[] = [
  ITEMS[0], // Lunea Romance
  ITEMS[3], // Lunea Noche Especial
  ITEMS[7], // Sesión de Fotografía
];