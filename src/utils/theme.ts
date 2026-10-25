const palette = {
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',

  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate600: '#475569',
  slate900: '#0F172A',

  white: '#FFFFFF',

  emerald50: '#ECFDF5',
  emerald600: '#059669',

  orange50: '#FFF7ED',
  orange500: '#F97316',

  rose50: '#FFF1F2',
  rose600: '#E11D48',
} as const;

export const colors = {
  primary: palette.indigo600,
  primaryPressed: palette.indigo700,
  primarySoft: palette.indigo50,
  primaryBorder: palette.indigo100,

  background: palette.slate50,
  surface: palette.white,
  surfaceMuted: palette.slate100,

  textPrimary: palette.slate900,
  textSecondary: palette.slate600,
  textMuted: palette.slate400,
  textInverse: palette.white,

  border: palette.slate200,
  borderStrong: palette.slate300,

  success: palette.emerald600,
  successSoft: palette.emerald50,

  streak: palette.orange500,
  streakSoft: palette.orange50,

  danger: palette.rose600,
  dangerSoft: palette.rose50,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const fontSize = {
  caption: 12,
  body: 14,
  bodyLg: 15,
  title: 17,
  heading: 20,
  display: 26,
  hero: 34,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const shadows = {
  subtle: {
    shadowColor: palette.slate900,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  card: {
    shadowColor: palette.slate900,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  raised: {
    shadowColor: palette.slate900,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
};
