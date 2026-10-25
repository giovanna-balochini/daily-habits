export const HABIT_COLORS = [
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
  '#F43F5E',
  '#F97316',
  '#F59E0B',
  '#10B981',
  '#14B8A6',
  '#0EA5E9',
  '#64748B',
] as const;

export const HABIT_ICONS = [
  '⭐',
  '💪',
  '📚',
  '🏃',
  '💧',
  '🧘',
  '✍️',
  '🎯',
  '💤',
  '🥗',
  '🚰',
  '📝',
  '🎨',
  '🎵',
  '💊',
  '🌱',
  '🧹',
  '☕',
  '🚶',
  '🍎',
] as const;

export const ICON_COLOR_MAP: Record<string, string> = {
  '⭐': '#F59E0B',
  '💪': '#EF4444',
  '📚': '#6366F1',
  '🏃': '#F97316',
  '💧': '#0EA5E9',
  '🧘': '#8B5CF6',
  '✍️': '#4F46E5',
  '🎯': '#F43F5E',
  '💤': '#7C3AED',
  '🥗': '#10B981',
  '🚰': '#06B6D4',
  '📝': '#3B82F6',
  '🎨': '#EC4899',
  '🎵': '#8B5CF6',
  '💊': '#EF4444',
  '🌱': '#22C55E',
  '🧹': '#F59E0B',
  '☕': '#B45309',
  '🚶': '#10B981',
  '🍎': '#E11D48',
};

export function getColorForIcon(icon: string): string {
  return ICON_COLOR_MAP[icon] ?? HABIT_COLORS[0];
}

export const WEEKDAY_LABELS: Record<number, string> = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sáb',
};

export const WEEKDAY_ORDER = [0, 1, 2, 3, 4, 5, 6] as const;

export const STORAGE_KEYS = {
  HABITS: '@daily_habits:habits',
  COMPLETIONS: '@daily_habits:completions',
} as const;
