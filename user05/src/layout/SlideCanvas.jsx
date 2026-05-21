import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { slideAspectRatio } from './responsiveTokens';

/**
 * Responsive slide stage — replaces fixed 1020×700 inline styles.
 */
export default function SlideCanvas({ title, subtitle, children, emptyMessage }) {
  if (emptyMessage) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        mx: 'auto',
        p: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      {(title || subtitle) && (
        <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
          {title && (
            <Typography variant="h6" component="h2" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.5, wordBreak: 'break-word', fontSize: { xs: '0.875rem', md: '1rem' } }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', lg: 1020, xl: 1200 },
          mx: 'auto',
          aspectRatio: slideAspectRatio,
          maxHeight: { xs: 'none', md: 'min(70vh, 700px)' },
          minHeight: { xs: 280, sm: 360 },
          overflow: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          p: { xs: 2, md: 3 },
          '& img': { maxWidth: '100%', height: 'auto' },
          '& canvas': { maxWidth: '100%', height: 'auto' },
        }}
      >
        <Box sx={{ width: '100%', height: '100%', minHeight: 0 }}>{children}</Box>
      </Paper>
    </Box>
  );
}
