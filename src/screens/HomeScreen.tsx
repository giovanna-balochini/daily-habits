import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';
import { colors, fontSize, fontWeight, radius, spacing } from '../utils/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { todayHabits, toggleCompletion } = useHabits();

  const completedCount = todayHabits.filter((h) => h.isCompletedToday).length;
  const hasHabits = todayHabits.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={todayHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            onToggle={toggleCompletion}
            onPress={(habitId) =>
              navigation.navigate('HabitDetail', { habitId })
            }
          />
        )}
        ListHeaderComponent={
          hasHabits ? (
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                {completedCount} de {todayHabits.length} concluídos hoje
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.round(
                        (completedCount / todayHabits.length) * 100
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="leaf-outline" size={26} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum hábito para hoje</Text>
            <Text style={styles.emptyText}>
              Toque em "Novo" no topo da tela para criar seu primeiro hábito e
              começar a acompanhar sua rotina.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={[
          styles.listContent,
          !hasHabits && styles.listContentEmpty,
        ]}
        ListFooterComponent={<View style={{ height: spacing.xxl }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  summary: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  summaryText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  progressTrack: {
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  separator: {
    height: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
});
