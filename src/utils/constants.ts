export const HABIT_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#3b82f6',
];

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
];

export const WEEKDAY_LABELS: Record<number, string> = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sáb',
};

export const STORAGE_KEYS = {
  HABITS: '@daily_habits:habits',
  COMPLETIONS: '@daily_habits:completions',
} as const;