export type PlanCategory = 'Alojamiento' | 'Actividad';

export interface Item {
  id: string | number;
  name: string;
  description: string;
  category: PlanCategory;
  price: number;
  priceUnit: string;
  details: string;
}

export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}
