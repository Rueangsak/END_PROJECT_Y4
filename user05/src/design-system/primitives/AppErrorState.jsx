import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FadeIn from '../motion/FadeIn';
import AppButton from './AppButton';

/**
 * Error feedback with optional retry.
 */
export default function AppErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  open = true,
}) {
  return (
    <FadeIn>
      <Box sx={{ py: 4, px: 2, width: '100%', maxWidth: 480, mx: 'auto' }}>
        <Stack spacing={2}>
          <Collapse in={open}>
            <Alert severity="error">
              <Typography variant="subtitle2" fontWeight={600}>
                {title}
              </Typography>
              {message && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {message}
                </Typography>
              )}
            </Alert>
          </Collapse>
          {onRetry && (
            <AppButton variant="outlined" onClick={onRetry}>
              {retryLabel}
            </AppButton>
          )}
        </Stack>
      </Box>
    </FadeIn>
  );
}
