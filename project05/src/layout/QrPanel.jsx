import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppButton, AppEmptyState, AppLoader } from '../design-system';

/**
 * QR code display — centered, accessible, works in modal or inline.
 */
export default function QrPanel({ imageUrl, loading, error, onRetry, caption, participantUrl }) {
  if (loading) {
    return <AppLoader message="Generating QR code..." />;
  }

  if (error || !imageUrl) {
    return (
      <AppEmptyState
        title="QR code unavailable"
        description="Check your connection and try again."
        action={
          onRetry ? (
            <AppButton variant="contained" onClick={onRetry}>
              Retry
            </AppButton>
          ) : null
        }
      />
    );
  }

  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
      <Box
        component="img"
        src={imageUrl}
        alt="QR code for participants to join the session"
        sx={{
          width: '100%',
          maxWidth: 280,
          height: 'auto',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: 1,
        }}
      />
      {caption && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {caption}
        </Typography>
      )}
      {participantUrl && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ wordBreak: 'break-all', textAlign: 'center', maxWidth: 320 }}
        >
          {participantUrl}
        </Typography>
      )}
    </Stack>
  );
}
