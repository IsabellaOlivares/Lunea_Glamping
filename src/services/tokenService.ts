import * as SecureStore from 'expo-secure-store';
import type { AuthTokens } from '../types';

const KEYS = {
  ACCESS: 'lunea_auth_access_token',
  REFRESH: 'lunea_auth_refresh_token',
} as const;

/** Guarda access y refresh token en SecureStore */
export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(KEYS.ACCESS, tokens.accessToken),
    SecureStore.setItemAsync(KEYS.REFRESH, tokens.refreshToken),
  ]);
}

/** Retorna el access token guardado (null si no existe) */
export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.ACCESS);
}

/** Retorna el refresh token guardado (null si no existe) */
export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(KEYS.REFRESH);
}

/** Elimina ambos tokens (logout) */
export async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(KEYS.ACCESS),
    SecureStore.deleteItemAsync(KEYS.REFRESH),
  ]);
}