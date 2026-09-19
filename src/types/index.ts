export type PlanCategory = 'Alojamiento' | 'Actividad'; 

export interface Item {
  id: string;
  name: string;
  category: PlanCategory;
  imageUri: string;
  description: string;
  details: string;
  price: number;
  priceUnit: string;
}
