import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type { CreateItemPayload, Item, UpdateItemPayload } from '../types';

export const ITEMS_QUERY_KEY = ['items'] as const;

export function useItems() {
  return useQuery<Item[]>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: () => apiClient.get<Item[]>('/items').then(r => r.data),
  });
}

export function useItemById(id: number | string) {
  return useQuery<Item>({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Item>(`/items/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: (payload) =>
      apiClient.post<Item>('/items', payload).then(r => r.data),
    onSuccess: () => {
      // Invalidar la lista para que se refresque automáticamente
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─────────────────────────────────────────
// UPDATE — para el formulario Edit
// ─────────────────────────────────────────

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Item, Error, UpdateItemPayload>({
    mutationFn: (payload) =>
      apiClient.put<Item>(`/items/${payload.id}`, payload).then(r => r.data),
    onSuccess: (_, variables) => {
      // Invalidar lista e ítem individual
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}
