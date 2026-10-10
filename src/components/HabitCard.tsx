import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { HabitWithStats } from '../types/habit';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggle: (habitId: string) => void;
  onPress: (habitId: string) => void;
}

export default function HabitCard({ habit, onToggle, onPress }: HabitCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(habit.id)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: `${habit.color}15`,
            borderColor: `${habit.color}50`,
          },
        ]}
      >
        <Text style={styles.iconEmoji}>{habit.icon}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.habitName,
              habit.isCompletedToday && styles.habitNameCompleted,
            ]}
            numberOfLines={2}
          >
            {habit.name}
          </Text>
          <TouchableOpacity
            style={[
              styles.checkbox,
              habit.isCompletedToday && {
                backgroundColor: habit.color,
                borderColor: habit.color,
              },
            ]}
            onPress={() => onToggle(habit.id)}
            activeOpacity={0.7}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            {habit.isCompletedToday && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={12} color="#F97316" />
            <Text style={styles.streakText}>
              {habit.currentStreak} {habit.currentStreak === 1 ? 'dia' : 'dias'}
            </Text>
          </View>

          <View style={styles.totalBadge}>
            <Ionicons name="checkmark-circle-outline" size={12} color="#64748B" />
            <Text style={styles.totalText}>
              {habit.totalCompletions}x
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#172033',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 999,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 26,
  },
  contentWrapper: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  habitName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#172033',
    marginRight: 12,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2410C',
  },
  totalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});