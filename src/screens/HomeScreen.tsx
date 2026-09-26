import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { COLORS, SPACING } from '../theme';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SAMPLE_ITEMS: Item[] = [
  { id: '1', name: 'Lunea Romance', description: 'Cena romántica, fogata, desayuno', category: 'Alojamiento', price: 380000, priceUnit: 'por noche', details: 'Pareja', progress: 0.8 },
  { id: '2', name: 'Lunea Amigos', description: 'Fogata grupal, cine bajo las estrellas', category: 'Alojamiento', price: 450000, priceUnit: 'por noche', details: 'Hasta 4 personas', progress: 0.45 },
  { id: '3', name: 'Masaje Relajante', description: 'Masaje cuerpo completo', category: 'Actividad', price: 80000, priceUnit: 'por persona', details: 'Duración 60 min', progress: 0.2 },
  { id: '4', name: 'Paseo en Kayak', description: 'Incluye kayak y elementos de seguridad', category: 'Actividad', price: 60000, priceUnit: 'por persona', details: 'Recorrido 60 min', progress: 0.65 },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const [items, setItems] = useState<Item[]>(SAMPLE_ITEMS);

  const itemAnims = useRef(SAMPLE_ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      80,
      itemAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const handleRemoveItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: `Plan nuevo ${items.length + 1}`,
      description: 'Nuevo plan añadido dinámicamente',
      category: 'Actividad',
      price: 50000,
      priceUnit: 'por persona',
      details: 'Por definir',
      progress: Math.random(),
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prev => [...prev, newItem]);
  };

  const renderItem = ({ item, index }: { item: Item; index: number }) => {
    const anim = itemAnims[index] ?? new Animated.Value(1);

    return (
      <Animated.View
        style={{
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <AnimatedCard
          onPress={() => navigation.navigate('Detail', { itemId: item.id })}
          style={styles.card}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          {item.progress !== undefined && (
            <ProgressBar progress={item.progress} label="Disponibilidad" />
          )}
          <AnimatedButton
            label="Eliminar"
            variant="success"
            onPress={() => handleRemoveItem(item.id)}
          />
        </AnimatedCard>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Lunea Glamping</Text>
            <Text style={styles.subtitle}>{items.length} planes</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AnimatedButton label="+ Añadir plan" onPress={handleAddItem} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.xl, gap: SPACING.md },
  header: { marginBottom: SPACING.md },
  title: { color: COLORS.text, fontSize: 26, fontWeight: '700' },
  subtitle: { color: COLORS.textMuted, fontSize: 13, marginTop: 2 },
  card: { gap: SPACING.sm },
  itemName: { color: COLORS.text, fontSize: 16, fontWeight: '600' },
  itemDescription: { color: COLORS.textSecondary, fontSize: 13 },
  separator: { height: SPACING.md },
  footer: { marginTop: SPACING.xl },
});