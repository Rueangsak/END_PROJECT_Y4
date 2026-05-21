/** Semantic color tokens — single source for light/dark palettes. */
export const colors = {
  brand: {
    primary: '#0B57D0',
    primaryDark: '#084298',
    primaryLight: '#4B8FE8',
    secondary: '#4F46E5',
    secondaryDark: '#3730A3',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  semantic: {
    success: '#15803D',
    successLight: '#DCFCE7',
    warning: '#B45309',
    warningLight: '#FEF3C7',
    error: '#B91C1C',
    errorLight: '#FEE2E2',
    info: '#0369A1',
    infoLight: '#E0F2FE',
  },
};

export const lightPalette = {
  mode: 'light',
  primary: {
    main: colors.brand.primary,
    dark: colors.brand.primaryDark,
    light: colors.brand.primaryLight,
    contrastText: colors.neutral[0],
  },
  secondary: {
    main: colors.brand.secondary,
    dark: colors.brand.secondaryDark,
    contrastText: colors.neutral[0],
  },
  success: { main: colors.semantic.success, light: colors.semantic.successLight },
  warning: { main: colors.semantic.warning, light: colors.semantic.warningLight },
  error: { main: colors.semantic.error, light: colors.semantic.errorLight },
  info: { main: colors.semantic.info, light: colors.semantic.infoLight },
  background: {
    default: colors.neutral[50],
    paper: colors.neutral[0],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[600],
    disabled: colors.neutral[400],
  },
  divider: colors.neutral[200],
};

export const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#6BA3F5',
    dark: colors.brand.primary,
    light: '#93C5FD',
    contrastText: colors.neutral[900],
  },
  secondary: {
    main: '#A5B4FC',
    dark: colors.brand.secondary,
    contrastText: colors.neutral[900],
  },
  success: { main: '#4ADE80', light: '#14532D' },
  warning: { main: '#FBBF24', light: '#78350F' },
  error: { main: '#F87171', light: '#7F1D1D' },
  info: { main: '#38BDF8', light: '#0C4A6E' },
  background: {
    default: '#0B1220',
    paper: '#111827',
  },
  text: {
    primary: colors.neutral[50],
    secondary: colors.neutral[400],
    disabled: colors.neutral[600],
  },
  divider: '#1F2937',
};
