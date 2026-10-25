import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../types/navigation';
import type { HabitFrequency } from '../types/habit';
import { useHabits } from '../context/HabitContext';
import StatTile from '../components/StatTile';
import { WEEKDAY_LABELS } from '../utils/constants';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from '../utils/theme';

type HabitDetailRoute = RouteProp<RootStackParamList, 'HabitDetail'>;

function describeFrequency(frequency: HabitFrequency): string {
  if (frequency.type === 'daily') {
    return 'Diariamente';
  }

  if (frequency.type === 'weekly') {
    return 'Toda segunda-feira';
  }

  const days = frequency.specificDays ?? [];

  if (days.length === 0 || days.length === 7) {
    return 'Todos os dias';
  }

  return days.map((day) => WEEKDAY_LABELS[day]).join(' · ');
}

function formatCreatedAt(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('pt-BR');
}

export default function HabitDetailScreen() {
  const route = useRoute<HabitDetailRoute>();
  const { habitId } = route.params;
  const { getHabitById, toggleCompletion } = useHabits();

  const habit = getHabitById(habitId);

  if (!habit) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name="alert-circle-outline"
            size={26}
            color={colors.textMuted}
          />
        </View>
        <Text style={styles.emptyTitle}>Hábito não encontrado</Text>
        <Text style={styles.emptyText}>
          Este hábito pode ter sido removido. Volte para a lista e tente
          novamente.
        </Text>
      </View>
    );
  }

  const streakLabel =
    habit.currentStreak === 1 ? 'dia seguido' : 'dias seguidos';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View
          style={[
            styles.heroIcon,
            {
              backgroundColor: `${habit.color}14`,
              borderColor: `${habit.color}33`,
            },
          ]}
        >
          <Text style={styles.heroEmoji}>{habit.icon}</Text>
        </View>

        <Text style={styles.heroName}>{habit.name}</Text>

        <View style={styles.frequencyChip}>
          <Ionicons
            name="repeat-outline"
            size={13}
            color={colors.textSecondary}
          />
          <Text style={styles.frequencyText}>
            {describeFrequency(habit.frequency)}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatTile
          icon="flame"
          accentColor={colors.streak}
          value={String(habit.currentStreak)}
          label={streakLabel}
        />
        <StatTile
          icon="checkmark-circle"
          accentColor={colors.success}
          value={String(habit.totalCompletions)}
          label="Conclusões"
        />
        <StatTile
          icon="today"
          accentColor={colors.primary}
          value={habit.isCompletedToday ? 'Sim' : 'Não'}
          label="Concluído hoje"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: habit.isCompletedToday
              ? colors.success
              : colors.primary,
          },
        ]}
        onPress={() => toggleCompletion(habit.id)}
        activeOpacity={0.85}
        accessibilityRole="button"
      >
        <Ionicons
          name={habit.isCompletedToday ? 'checkmark-circle' : 'ellipse-outline'}
          size={20}
          color={colors.textInverse}
        />
        <Text style={styles.actionButtonText}>
          {habit.isCompletedToday
            ? 'Concluído hoje'
            : 'Marcar como feito hoje'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Informações</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Frequência</Text>
          <Text style={styles.infoValue}>
            {describeFrequency(habit.frequency)}
          </Text>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Criado em</Text>
          <Text style={styles.infoValue}>
            {formatCreatedAt(habit.createdAt)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroEmoji: {
    fontSize: 32,
  },
  heroName: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: spacing.md,
  },
  frequencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  frequencyText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 52,
    borderRadius: radius.md,
    marginBottom: spacing.xxl,
  },
  actionButtonText: {
    fontSize: fontSize.bodyLg,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  infoSection: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  infoTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingVertical: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  infoLabel: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: spacing.lg,
  },
  infoDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
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
