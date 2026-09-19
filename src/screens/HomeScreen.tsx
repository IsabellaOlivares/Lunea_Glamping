import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Plan } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_PLANS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Lunea Glamping';
  const DOMAIN_SUBTITLE = 'Una experiencia única bajo las estrellas';

  function handleItemPress(item: Plan): void {
    console.log('Plan seleccionado:', item.name);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        
        {MOCK_PLANS.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onPress={handleItemPress}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  // Header — TODO: ajusta según el diseño de tu dominio
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8b949e',
    marginTop: 4,
  },

  // List
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});
