import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name, description, category, price, priceUnit, details } = route.params;

  const isItemSaved = useSavedStore((state) => state.isItemSaved);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const isSaved = isItemSaved(id);

  function handleToggleSave(): void {
    if (isSaved) {
      removeItem(id);
    } else {
      addItem({ id, name, description, category, price, priceUnit, details });
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{category}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Precio</Text>
          <Text style={styles.fieldValue}>
            ${price.toLocaleString('es-CO')} {priceUnit}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            {category === 'Alojamiento' ? 'Capacidad' : 'Duración'}
          </Text>
          <Text style={styles.fieldValue}>{details}</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? '★  Guardado' : '☆  Guardar'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg },
  hero: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: { fontSize: 40, fontWeight: '700', color: COLORS.accent },
  info: { gap: SPACING.sm },
  title: { ...TYPOGRAPHY.h2 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  badgeText: { ...TYPOGRAPHY.caption, color: COLORS.accent, fontWeight: '600' },
  description: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, lineHeight: 24 },
  field: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1, marginBottom: SPACING.xs },
  fieldValue: { ...TYPOGRAPHY.body },
  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  saveButtonPressed: { opacity: 0.7 },
  saveButtonText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.textPrimary },
  saveButtonTextActive: { color: COLORS.background },
});