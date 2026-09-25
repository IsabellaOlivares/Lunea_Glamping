// src/navigation/types.ts
// Tipado del stack de navegación

export type RootStackParamList = {
  Home:   undefined;
  Detail: {id: number | string; name: string};
  Create: undefined;
  Edit:   { id: number | string; name: string };
};
