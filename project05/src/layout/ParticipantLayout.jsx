import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { layoutSpacing } from '../design-system/tokens/spacing';
import useReducedMotion from '../design-system/motion/useReducedMotion';
import { getTransitionTimeout } from '../design-system/motion/transitions';

/**
 * Participant-facing layout: centered, readable, mobile-first.
 */
export default function ParticipantLayout({ children, step, totalSteps, label }) {
  const reducedMotion = useReducedMotion();
  const progress = totalSteps > 0 ? Math.min(100, Math.round((step / totalSteps) * 100)) : 0;
  const fadeTimeout = getTransitionTimeout(reducedMotion);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {totalSteps > 0 && (
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            px: layoutSpacing.pageX,
            py: 1.5,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            {label || `Question ${step} of ${totalSteps}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            aria-label="Session progress"
            sx={{ borderRadius: 1, height: 6 }}
          />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: layoutSpacing.pageX,
          py: layoutSpacing.pageY,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 720 }}>
          {reducedMotion ? (
            children
          ) : (
            <Fade in appear key={step} timeout={fadeTimeout}>
              <Box>{children}</Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
}
