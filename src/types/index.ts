export type PlanCategory = 'Alojamiento' | 'Actividad';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: PlanCategory;
  price: number;
  priceUnit: string;
  details: string;
}