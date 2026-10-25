import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useHabits } from '../context/HabitContext';
import HabitCard from '../components/HabitCard';
import StatTile from '../components/StatTile';
import { colors, fontSize, fontWeight, radius, spacing } from '../utils/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StatsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    habits,
    completions,
    todayHabits,
    allHabitsWithStats,
    toggleCompletion,
  } = useHabits();

  const completedToday = todayHabits.filter((h) => h.isCompletedToday).length;

  const bestStreak = allHabitsWithStats.reduce(
    (max, habit) => Math.max(max, habit.currentStreak),
    0
  );

  const rankedHabits = [...allHabitsWithStats].sort(
    (a, b) =>
      b.currentStreak - a.currentStreak ||
      b.totalCompletions - a.totalCompletions
  );

  const hasHabits = rankedHabits.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={rankedHabits}
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
          <View>
            <View style={styles.statsGrid}>
              <View style={styles.statsRow}>
                <StatTile
                  icon="layers"
                  accentColor={colors.primary}
                  value={String(habits.length)}
                  label="Hábitos ativos"
                />
                <StatTile
                  icon="today"
                  accentColor={colors.success}
                  value={`${completedToday}/${todayHabits.length}`}
                  label="Concluídos hoje"
                />
              </View>

              <View style={styles.statsRow}>
                <StatTile
                  icon="flame"
                  accentColor={colors.streak}
                  value={String(bestStreak)}
                  label="Melhor sequência"
                />
                <StatTile
                  icon="checkmark-circle"
                  accentColor={colors.textSecondary}
                  value={String(completions.length)}
                  label="Conclusões totais"
                />
              </View>
            </View>

            {hasHabits && (
              <Text style={styles.sectionTitle}>Por sequência</Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="stats-chart-outline"
                size={26}
                color={colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>Sem dados ainda</Text>
            <Text style={styles.emptyText}>
              Quando você começar a concluir hábitos, suas estatísticas
              aparecerão aqui.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
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
  statsGrid: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.md,
  },
  separator: {
    height: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
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
