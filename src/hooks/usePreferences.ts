import { useMMKVString, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

// ─── Claves de preferencias (evitar strings sueltos) ─────────────────────────
const PREF_KEYS = {
  SORT_ORDER:   'pref_sortOrder',
  COMPACT_MODE: 'pref_compactMode',
  ITEMS_PER_PAGE: 'pref_itemsPerPage',
} as const;

// ─── Tipo de los valores de sortOrder ─────────────────────────────────────────
export type SortOrder = 'asc' | 'desc';

// ─── Hook principal ────────────────────────────────────────────────────────────
export function usePreferences() {
  // TODO: reemplazar los useState por hooks de MMKV
  // ─────────────────────────────────────────────
  const [sortOrder, setSortOrder]       = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  const [compactMode, setCompactMode]   = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);
  const [itemsPerPage, setItemsPerPage] = useMMKVNumber(PREF_KEYS.ITEMS_PER_PAGE, storage);


  // TODO: agrega preferencias adicionales de tu dominio aquí

  return {
    // Valores con defaults para evitar undefined
    sortOrder: (sortOrder ?? 'asc') as SortOrder,
    setSortOrder: (value: SortOrder) => setSortOrder(value),

    compactMode: compactMode ?? false,
    setCompactMode:(value:boolean) => setCompactMode(value),


    itemsPerPage: itemsPerPage ?? 10,
    setItemsPerPage: (value: number) => setItemsPerPage(value),
  };
}
