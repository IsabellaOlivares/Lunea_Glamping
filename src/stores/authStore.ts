// ============================================
// AUTH STORE — Zustand con persist + SecureStore
// ============================================
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import type { AuthUser, LoginCredentials, RegisterData } from '../types';
import { saveTokens, clearTokens, getRefreshToken } from '../services/tokenService';
import * as authService from '../services/authService';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  clearError: () => void;
}

function toAuthUser(response: {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}): AuthUser {
  return {
    id: response.id,
    username: response.username,
    email: response.email,
    firstName: response.firstName,
    lastName: response.lastName,
    image: response.image,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          await saveTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken });
          set({ user: toAuthUser(response), isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data as { message?: string } | undefined)?.message ??
              'Usuario o contraseña incorrectos'
            : 'No se pudo iniciar sesión';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          await saveTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken });
          set({ user: toAuthUser(response), isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({ error: 'No se pudo crear la cuenta', isLoading: false });
          throw err;
        }
      },

      logout: async () => {
        await clearTokens();
        set({ user: null, isAuthenticated: false, error: null });
      },

      refreshTokens: async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          await get().logout();
          return;
        }
        try {
          const response = await authService.refreshTokens(refreshToken);
          await saveTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken });
        } catch {
          await get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'lunea-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Los tokens NO se persisten aquí — viven solo en SecureStore
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);