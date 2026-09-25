import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';
import type { RootStackParamList } from '../navigation/types';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const { data: item, isLoading: isLoadingItem } = useItemById(id);
  const { mutate: updateItem, isPending } = useUpdateItem();

  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'Alojamiento',
      price: 0,
      priceUnit: '',
      details: '',
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        priceUnit: item.priceUnit,
        details: item.details,
      });
    }
  }, [item, reset]);

  const category = watch('category');

  function onSubmit(formData: ItemFormData): void {
    updateItem(
      { id, ...formData, description: formData.description ?? '' },
      { onSuccess: () => navigation.goBack() }
    );
  }

  if (isLoadingItem) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField control={control} name="name" label="Nombre" errorMessage={errors.name?.message} />

        <View style={styles.field}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categoryRow}>
            <Pressable
              style={[styles.categoryOption, category === 'Alojamiento' && styles.categoryOptionActive]}
              onPress={() => setValue('category', 'Alojamiento')}
            >
              <Text style={[styles.categoryText, category === 'Alojamiento' && styles.categoryTextActive]}>Alojamiento</Text>
            </Pressable>
            <Pressable
              style={[styles.categoryOption, category === 'Actividad' && styles.categoryOptionActive]}
              onPress={() => setValue('category', 'Actividad')}
            >
              <Text style={[styles.categoryText, category === 'Actividad' && styles.categoryTextActive]}>Actividad</Text>
            </Pressable>
          </View>
        </View>

        <FormField control={control} name="price" label="Precio" keyboardType="numeric" errorMessage={errors.price?.message} />
        <FormField control={control} name="priceUnit" label="Unidad del precio" errorMessage={errors.priceUnit?.message} />
        <FormField
          control={control}
          name="details"
          label={category === 'Alojamiento' ? 'Capacidad' : 'Duración'}
          errorMessage={errors.details?.message}
        />
        <FormField
          control={control}
          name="description"
          label="Descripción"
          multiline
          numberOfLines={4}
          style={styles.multiline}
          errorMessage={errors.description?.message}
        />

        <Pressable style={[styles.button, isPending && styles.buttonDisabled]} onPress={handleSubmit(onSubmit)} disabled={isPending}>
          {isPending ? <ActivityIndicator size="small" color={COLORS.text} /> : <Text style={styles.buttonText}>Guardar cambios</Text>}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background },
  field: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.6 },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  categoryRow: { flexDirection: 'row', gap: SPACING.sm },
  categoryOption: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.sm, padding: SPACING.sm, alignItems: 'center' },
  categoryOptionActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  categoryText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  categoryTextActive: { color: COLORS.text, fontWeight: '600' },
  button: { backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, padding: SPACING.md, alignItems: 'center', marginTop: SPACING.sm },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.text },
});