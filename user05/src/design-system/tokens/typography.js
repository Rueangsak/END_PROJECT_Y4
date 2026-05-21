export const fontFamily = '"Inter", "Segoe UI", "Lato", system-ui, sans-serif';

/** Fluid type scale — scales between mobile and desktop. */
export const typographyScale = {
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    fontSize: 'clamp(1.75rem, 2.5vw + 1rem, 2.5rem)',
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
    fontSize: 'clamp(1.5rem, 2vw + 0.75rem, 2rem)',
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.25,
    fontSize: 'clamp(1.25rem, 1.5vw + 0.65rem, 1.75rem)',
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.3,
    fontSize: 'clamp(1.125rem, 1.25vw + 0.6rem, 1.5rem)',
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.35,
    fontSize: 'clamp(1rem, 1vw + 0.55rem, 1.25rem)',
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: 'clamp(0.9375rem, 0.75vw + 0.5rem, 1.125rem)',
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: 'clamp(0.9375rem, 0.5vw + 0.8rem, 1rem)',
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: 'clamp(0.8125rem, 0.4vw + 0.75rem, 0.875rem)',
  },
  body1: {
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: 'clamp(0.875rem, 0.35vw + 0.8rem, 1rem)',
  },
  body2: {
    fontWeight: 400,
    lineHeight: 1.55,
    fontSize: 'clamp(0.8125rem, 0.3vw + 0.75rem, 0.875rem)',
  },
  button: {
    fontWeight: 600,
    lineHeight: 1.5,
    textTransform: 'none',
    fontSize: '0.9375rem',
  },
  caption: {
    lineHeight: 1.45,
    fontSize: '0.75rem',
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontSize: '0.6875rem',
  },
};
