import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Respects OS "reduce motion" — use to skip or shorten animations.
 */
export default function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
}
