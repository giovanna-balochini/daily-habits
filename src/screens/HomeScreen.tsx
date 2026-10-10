import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isLoading, todayHabits, toggleCompletion } = useHabits();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6366F1" />
      </SafeAreaView>
    );
  }

  function handleNavigateToDetail(habitId: string) {
    navigation.navigate('HabitDetail', { habitId });
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={todayHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onToggle={(habitId) => toggleCompletion(habitId)}
            onPress={handleNavigateToDetail}
          />
        )}
        contentContainerStyle={
          todayHabits.length === 0
            ? [styles.listContent, styles.centerContent]
            : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyTitle}>Nenhum hábito para hoje</Text>
            <Text style={styles.emptyText}>
              Toque em {'"Novo"'} no canto superior direito para cadastrar seu primeiro hábito.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 20,
    paddingTop: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172033',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
});