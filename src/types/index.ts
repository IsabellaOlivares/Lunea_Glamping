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

export type CreateItemPayload = Omit<Item, 'id'>;

export interface UpdateItemPayload extends CreateItemPayload {
  id: string | number;
}