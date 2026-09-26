import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { theme } from '../theme';

interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  priceUnit: string;
  details: string;
}

const ITEMS_URL = 'https://6ab094cf9751d2b03e6c34f0.mockapi.io/items';

export function HomeScreen(): React.JSX.Element {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['home-items'],
    queryFn: async () => {
      const response = await axios.get<Item[]>(ITEMS_URL);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No se pudo cargar el contenido</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hola, {user?.firstName ?? user?.username} 👋
        </Text>
        <Text style={styles.subtitle}>Planes disponibles en Lunea Glamping</Text>
      </View>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemSubtitle}>
              {'$' + item.price.toLocaleString('es-CO') + ' ' + item.priceUnit}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay elementos para mostrar</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  header: { padding: theme.spacing.md, paddingTop: theme.spacing.lg, gap: theme.spacing.xs },
  greeting: { fontSize: theme.fontSize.xl, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
  list: { padding: theme.spacing.md, gap: theme.spacing.sm },
  card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding: theme.spacing.md, gap: theme.spacing.xs },
  itemTitle: { fontSize: theme.fontSize.md, fontWeight: '600', color: theme.colors.text },
  itemSubtitle: { fontSize: theme.fontSize.sm, color: theme.colors.textSecondary },
  emptyText: { color: theme.colors.textMuted, textAlign: 'center', marginTop: theme.spacing.xl },
  errorText: { color: theme.colors.danger, fontSize: theme.fontSize.md },
});