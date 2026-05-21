/** MUI breakpoint values (px). */
export const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const mediaQueries = {
  mobile: `@media (max-width:${breakpointValues.sm - 1}px)`,
  tablet: `@media (min-width:${breakpointValues.sm}px) and (max-width:${breakpointValues.md - 1}px)`,
  laptop: `@media (min-width:${breakpointValues.md}px) and (max-width:${breakpointValues.lg - 1}px)`,
  desktop: `@media (min-width:${breakpointValues.lg}px)`,
  ultrawide: `@media (min-width:${breakpointValues.xl}px)`,
};
