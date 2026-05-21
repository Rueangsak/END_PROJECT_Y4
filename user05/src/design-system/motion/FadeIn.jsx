import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useReducedMotion from './useReducedMotion';
import { getTransitionTimeout } from './transitions';

/**
 * Gentle enter animation for sections and content blocks.
 */
export default function FadeIn({ children, delay = 0, sx, ...props }) {
  const reducedMotion = useReducedMotion();
  const timeout = getTransitionTimeout(reducedMotion);

  if (reducedMotion) {
    return (
      <Box sx={sx} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <Fade in appear timeout={timeout} style={{ transitionDelay: `${delay}ms` }}>
      <Box sx={{ width: '100%', ...sx }} {...props}>
        {children}
      </Box>
    </Fade>
  );
}
