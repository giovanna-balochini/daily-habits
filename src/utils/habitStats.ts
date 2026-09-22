import type { Habit, HabitCompletion, HabitWithStats } from '../types/habit';
import { getDayBefore, getTodayKey } from './dateUtils';

export function isHabitScheduledForDate(habit: Habit, dateKey: string): boolean {
  const date = new Date(dateKey + 'T00:00:00');
  const weekday = date.getDay();

  switch (habit.frequency.type) {
    case 'daily':
      return true;
    case 'weekly':
      return weekday === 1;
    case 'specific_days':
      return (habit.frequency.specificDays ?? []).includes(weekday as never);
    default:
      return false;
  }
}

export function isCompletedOnDate(
  completions: HabitCompletion[],
  habitId: string,
  dateKey: string
): boolean {
  return completions.some((c) => c.habitId === habitId && c.date === dateKey);
}

export function calculateCurrentStreak(
  completions: HabitCompletion[],
  habitId: string,
  todayKey: string = getTodayKey()
): number {
  let streak = 0;
  let currentDateKey = todayKey;

  while (true) {
    if (isCompletedOnDate(completions, habitId, currentDateKey)) {
      streak++;
      currentDateKey = getDayBefore(currentDateKey);
    } else {
      break;
    }
  }

  return streak;
}

export function countTotalCompletions(
  completions: HabitCompletion[],
  habitId: string
): number {
  return completions.filter((c) => c.habitId === habitId).length;
}

export function enrichHabitWithStats(
  habit: Habit,
  completions: HabitCompletion[],
  todayKey: string = getTodayKey()
): HabitWithStats {
  const isCompletedToday = isCompletedOnDate(completions, habit.id, todayKey);
  const currentStreak = calculateCurrentStreak(
    completions,
    habit.id,
    todayKey
  );
  const totalCompletions = countTotalCompletions(completions, habit.id);

  return {
    ...habit,
    isCompletedToday,
    currentStreak,
    totalCompletions,
  };
}

export function getHabitsForDate(
  habits: Habit[],
  completions: HabitCompletion[],
  dateKey: string
): HabitWithStats[] {
  return habits
    .filter((h) => isHabitScheduledForDate(h, dateKey))
    .map((h) => enrichHabitWithStats(h, completions, dateKey));
}
