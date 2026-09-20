import type { PlanCategory } from "../types";
export type RootTabParamList = {
  Home: undefined;
  Saved: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;

  HomeDetail: {
    id: string;
    name: string;
    description: string;
    category: PlanCategory;
    price: number;
    priceUnit: string;
    details: string;
  };
};
