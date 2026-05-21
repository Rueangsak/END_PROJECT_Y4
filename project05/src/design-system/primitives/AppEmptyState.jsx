import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FadeIn from '../motion/FadeIn';

/**
 * Empty data placeholder with optional action.
 */
export default function AppEmptyState({ title = 'No data yet', description, action }) {
  return (
    <FadeIn>
      <Box
        sx={{
          py: 6,
          px: 2,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Stack spacing={1.5} alignItems="center">
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
              {description}
            </Typography>
          )}
          {action}
        </Stack>
      </Box>
    </FadeIn>
  );
}
