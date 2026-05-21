/** 8px base grid — aligns with MUI theme.spacing(1) === 8px */
export const spacingUnit = 8;

export const spacing = {
  0: 0,
  0.5: 0.5,
  1: 1,
  1.5: 1.5,
  2: 2,
  2.5: 2.5,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
};

/** Responsive page/layout spacing (MUI spacing multiples). */
export const layoutSpacing = {
  pageX: { xs: 2, sm: 3, md: 4 },
  pageY: { xs: 2, sm: 3 },
  section: { xs: 2, md: 3 },
  stack: { xs: 1.5, sm: 2 },
  form: 2,
  formActions: 1.5,
  card: { xs: 2, md: 3 },
  cardCompact: { xs: 1.5, md: 2 },
};

export const containerMaxWidth = {
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1440,
  ultrawide: 1920,
};

export const touchTargetMin = 44;
export const slideAspectRatio = '1020 / 700';

/** Auth / narrow form max widths */
export const formMaxWidth = {
  sm: 400,
  md: 460,
  lg: 500,
};
