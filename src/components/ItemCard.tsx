import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Plan } from '../types';

interface PlanCardProps {
  item: Plan;
  onPress: (item: Plan) => void;
}

export function ItemCard({ item, onPress }: PlanCardProps): React.JSX.Element {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.capacity}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.cardPrice}>Desde ${item.price.toLocaleString('es-CO')} / noche</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 16, gap: 4 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  cardSubtitle: { fontSize: 14, color: '#8b949e' },
  cardDescription: { fontSize: 13, color: '#8b949e' },
  cardPrice: { fontSize: 15, fontWeight: '600', color: '#4CAF50', marginTop: 4 },
});
