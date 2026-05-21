import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useReducedMotion from './useReducedMotion';
import { getTransitionTimeout } from './transitions';

/**
 * Subtle route-level fade — use with a keyed outlet per pathname.
 */
export default function PageTransition({ children }) {
  const reducedMotion = useReducedMotion();
  const timeout = getTransitionTimeout(reducedMotion);

  if (reducedMotion) {
    return <Box sx={{ width: '100%' }}>{children}</Box>;
  }

  return (
    <Fade in appear timeout={timeout}>
      <Box sx={{ width: '100%', minHeight: 'inherit' }}>{children}</Box>
    </Fade>
  );
}
