import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppLoader } from '../design-system';

export default function QrPanel({ imageUrl, loading, caption, participantUrl }) {
  if (loading) return <AppLoader message="Generating QR code..." />;
  if (!imageUrl) {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center">
        QR code unavailable. Try again.
      </Typography>
    );
  }
  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
      <Box
        component="img"
        src={imageUrl}
        alt="QR code for participants to join the session"
        sx={{ width: '100%', maxWidth: 280, height: 'auto', borderRadius: 2, border: 1, borderColor: 'divider', p: 1 }}
      />
      {caption && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {caption}
        </Typography>
      )}
      {participantUrl && (
        <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all', textAlign: 'center' }}>
          {participantUrl}
        </Typography>
      )}
    </Stack>
  );
}
