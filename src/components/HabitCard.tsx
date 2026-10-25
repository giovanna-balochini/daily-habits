import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { HabitWithStats } from '../types/habit';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  shadows,
  spacing,
} from '../utils/theme';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggle: (habitId: string) => void;
  onPress: (habitId: string) => void;
}

export default function HabitCard({ habit, onToggle, onPress }: HabitCardProps) {
  const { isCompletedToday } = habit;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(habit.id)}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`${habit.name}, ${habit.currentStreak} dias de sequência`}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${habit.color}14`,
            borderColor: `${habit.color}33`,
          },
          isCompletedToday && styles.iconContainerCompleted,
        ]}
      >
        <Text style={styles.iconEmoji}>{habit.icon}</Text>
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.name, isCompletedToday && styles.nameCompleted]}
          numberOfLines={2}
        >
          {habit.name}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="flame" size={13} color={colors.streak} />
          <Text style={styles.metaText}>
            {habit.currentStreak} {habit.currentStreak === 1 ? 'dia' : 'dias'}
          </Text>

          <View style={styles.metaDot} />

          <Ionicons
            name="checkmark-circle"
            size={13}
            color={colors.textMuted}
          />
          <Text style={styles.metaText}>{habit.totalCompletions}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.check,
          isCompletedToday && {
            backgroundColor: habit.color,
            borderColor: habit.color,
          },
        ]}
        onPress={() => onToggle(habit.id)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isCompletedToday }}
        accessibilityLabel={`Concluir ${habit.name} hoje`}
      >
        {isCompletedToday && (
          <Ionicons name="checkmark" size={15} color={colors.textInverse} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.subtle,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerCompleted: {
    opacity: 0.55,
  },
  iconEmoji: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  nameCompleted: {
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.borderStrong,
    marginHorizontal: spacing.xs,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
