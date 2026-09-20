export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    priceUnit: string;
    details: string;
  };
};
