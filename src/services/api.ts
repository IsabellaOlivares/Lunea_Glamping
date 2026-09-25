import axios from 'axios';

const API_BASE_URL = 'https://6ab094cf9751d2b03e6c34f0.mockapi.io';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);