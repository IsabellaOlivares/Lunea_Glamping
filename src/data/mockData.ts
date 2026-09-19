import { Plan } from '../types';

// TODO: Reemplaza los valores por datos reales de tu dominio
// Usa imágenes representativas — puedes usar URLs de picsum.photos
// o incluir imágenes locales en assets/

export const MOCK_PLANS: Plan[] = [
  {
    id: '1',
    name: 'Lunea Romance', 
    capacity: 'Pareja',
    price: 380000,
    description: '-Cena romántica, Fogata, Desayuno, Decoración',
    imageUri: 'https://picsum.photos/seed/lunea1/300/200',
  },
  {
    id: '2',
    name: 'Lunea Amigos',
    capacity: 'Hasta 4 personas',
    price: 450000,
    description: '-Fogata grupal, Caminata Ecológica, Juegas al aire libre, Desayuno, Cine bajo las estrellas',
    imageUri: 'https://picsum.photos/seed/lunea2/300/200',
  },
  {
    id: '3',
    name: 'Lunea Familiar',
    capacity: 'Hasta 5 personas',
    price: 520000,
    description: 'Desayuno familiar, Caminata Ecológica, Juegos familiares, Fogata',
    imageUri: 'https://picsum.photos/seed/lunea3/300/200',
  },
  {
    id: '4',
    name: 'Lunea Noche Especial',
    capacity: 'Pareja',
    price: 600000,
    description: '-Domo premium, Jacuzzi privado, Cena especial, Fogata, Desayuno ,Decoración personalizada',
    imageUri: 'https://picsum.photos/seed/lunea4/300/200',
  },
];
