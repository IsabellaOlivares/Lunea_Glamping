// ============================================
// AUTH SERVICE — Llamadas a la API de autenticación
// ============================================
import axios from 'axios';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types';
import { AUTH_BASE_URL, authApi } from './api';

/**
 * Autentica al usuario con username y password contra dummyjson.
 * Usamos axios directo (no `authApi`) porque el token de auth aún no existe.
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${AUTH_BASE_URL}/auth/login`, {
    username: credentials.username,
    password: credentials.password,
    expiresInMins: 30,
  });
  return data;
}

/**
 * dummyjson.com no tiene endpoint real de registro.
 * Para el bootcamp se simula un registro exitoso con un pequeño delay,
 * generando tokens "mock" que igual se guardan y validan en el flujo real.
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    id: Math.floor(Math.random() * 100000),
    username: data.username,
    email: data.email,
    firstName: data.firstName ?? data.username,
    lastName: data.lastName ?? '',
    image: '',
    accessToken: `mock-access-${Date.now()}`,
    refreshToken: `mock-refresh-${Date.now()}`,
  };
}

/**
 * Renueva el access token usando el refresh token.
 * axios directo para evitar loops con los interceptores de `authApi`.
 */
export async function refreshTokens(refreshToken: string): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${AUTH_BASE_URL}/auth/refresh`, {
    refreshToken,
    expiresInMins: 30,
  });
  return data;
}

/** Obtiene el perfil del usuario autenticado (usa el interceptor de auth). */
export async function getProfile(): Promise<AuthResponse> {
  const { data } = await authApi.get<AuthResponse>('/auth/me');
  return data;
}