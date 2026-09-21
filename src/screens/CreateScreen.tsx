import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Alojamiento' | 'Actividad'>('Alojamiento');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('');
  const [details, setDetails] = useState('');

  const { mutate: createItem, isPending } = useCreateItem();

  function handleSubmit(): void {
    if (!name.trim() || !price.trim()) return;

    createItem(
      {
        name,
        description,
        category,
        price: Number(price),
        priceUnit,
        details,
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  }

  const canSubmit = name.trim().length > 0 && price.trim().length > 0 && !isPending;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Nuevo plan de Lunea Glamping</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Nombre <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ej. Lunea Aventura"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Categoría</Text>
          <View style={styles.categoryRow}>
            <Pressable
              style={[styles.categoryOption, category === 'Alojamiento' && styles.categoryOptionActive]}
              onPress={() => setCategory('Alojamiento')}
            >
              <Text style={[styles.categoryText, category === 'Alojamiento' && styles.categoryTextActive]}>
                Alojamiento
              </Text>
            </Pressable>
            <Pressable
              style={[styles.categoryOption, category === 'Actividad' && styles.categoryOptionActive]}
              onPress={() => setCategory('Actividad')}
            >
              <Text style={[styles.categoryText, category === 'Actividad' && styles.categoryTextActive]}>
                Actividad
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            Precio <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Ej. 380000"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Unidad del precio</Text>
          <TextInput
            style={styles.input}
            value={priceUnit}
            onChangeText={setPriceUnit}
            placeholder="Ej. por noche, por persona"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            {category === 'Alojamiento' ? 'Capacidad' : 'Duración'}
          </Text>
          <TextInput
            style={styles.input}
            value={details}
            onChangeText={setDetails}
            placeholder={category === 'Alojamiento' ? 'Ej. Hasta 4 personas' : 'Ej. Duración 60 min'}
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción del plan…"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={COLORS.background} />
          ) : (
            <Text style={styles.buttonText}>Crear plan</Text>
          )}
        </Pressable>

        <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  sectionLabel: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8 },
  field: { gap: SPACING.xs },
  fieldLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  required: { color: COLORS.error },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  multiline: { minHeight: 96, paddingTop: SPACING.sm },
  categoryRow: { flexDirection: 'row', gap: SPACING.sm },
  categoryOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  categoryOptionActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  categoryText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  categoryTextActive: { color: COLORS.background, fontWeight: '600' },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.background },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});