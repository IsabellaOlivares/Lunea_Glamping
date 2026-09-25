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

// ─── Autenticación (semana 08) ──────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse extends AuthTokens {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}