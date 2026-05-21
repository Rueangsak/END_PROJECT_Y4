import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import useReducedMotion from '../motion/useReducedMotion';
import { getTransitionTimeout } from '../motion/transitions';

/**
 * Centered loading indicator with gentle fade-in.
 */
export default function AppLoader({
  message = 'Loading...',
  fullScreen = false,
  size = 32,
}) {
  const reducedMotion = useReducedMotion();
  const timeout = getTransitionTimeout(reducedMotion);

  const content = (
    <Box
      sx={{
        minHeight: fullScreen ? '100vh' : '50vh',
        display: 'grid',
        placeItems: 'center',
        gap: 1.5,
        px: 2,
      }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <CircularProgress size={size} thickness={4} aria-hidden />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );

  if (reducedMotion) return content;

  return (
    <Fade in appear timeout={timeout}>
      {content}
    </Fade>
  );
}
