export const HABIT_COLORS = [
  '#6366F1',
  '#FBBF24',
  '#22D3EE',
  '#34D399',
  '#FB7185',
  '#FB923C',
  '#A78BFA',
  '#10B981',
  '#8B5CF6',
  '#EC4899',
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
  '⭐': '#FBBF24',
  '💪': '#FB923C',
  '📚': '#6366F1',
  '🏃': '#FB923C',
  '💧': '#22D3EE',
  '🧘': '#6366F1',
  '✍️': '#172033',
  '🎯': '#FB7185',
  '💤': '#8B5CF6',
  '🥗': '#34D399',
  '🚰': '#22D3EE',
  '📝': '#172033',
  '🎨': '#FB7185',
  '🎵': '#22D3EE',
  '💊': '#FB7185',
  '🌱': '#34D399',
  '🧹': '#FBBF24',
  '☕': '#FB923C',
  '🚶': '#34D399',
  '🍎': '#FB7185',
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

export const STORAGE_KEYS = {
  HABITS: '@daily_habits:habits',
  COMPLETIONS: '@daily_habits:completions',
} as const;