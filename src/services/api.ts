// ============================================
// AUTH API — Instancia Axios para dummyjson.com/auth
// con interceptor de refresco automático en 401.
//
// Nota: se usa una instancia separada de `api.ts` (que apunta al
// backend de ítems/mockapi) para no mezclar responsabilidades.
// ============================================
import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './tokenService';

export const AUTH_BASE_URL = 'https://dummyjson.com';

export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─────────────────────────────────────────────
// REQUEST interceptor: inyectar access token
// ─────────────────────────────────────────────
authApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─────────────────────────────────────────────
// RESPONSE interceptor: 401 → refresh → retry
// ─────────────────────────────────────────────
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        await clearTokens();
        return Promise.reject(error);
      }

      try {
        // axios directo (NO `authApi`) para evitar un loop de interceptores
        const { data } = await axios.post(`${AUTH_BASE_URL}/auth/refresh`, {
          refreshToken,
          expiresInMins: 30,
        });

        await saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);