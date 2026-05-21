import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useReducedMotion from '../motion/useReducedMotion';
import { getTransitionTimeout } from '../motion/transitions';

/**
 * Standardized dialog — smooth enter/exit, a11y, responsive maxWidth.
 */
export default function AppModal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  showClose = true,
}) {
  const reducedMotion = useReducedMotion();
  const timeout = getTransitionTimeout(reducedMotion);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="app-modal-title"
      TransitionComponent={reducedMotion ? undefined : Grow}
      TransitionProps={{
        timeout,
        style: { transformOrigin: 'center center' },
      }}
      slotProps={{
        backdrop: {
          sx: {
            transition: reducedMotion ? 'none' : 'opacity 220ms ease',
          },
        },
      }}
    >
      {title && (
        <DialogTitle id="app-modal-title" sx={{ pr: showClose ? 6 : 2 }}>
          <Typography variant="h6" component="span">
            {title}
          </Typography>
          {showClose && onClose && (
            <IconButton
              aria-label="Close dialog"
              onClick={onClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
              size="small"
            >
              ×
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={{ pt: title ? 1 : 2, pb: 3 }}>{children}</DialogContent>
    </Dialog>
  );
}
