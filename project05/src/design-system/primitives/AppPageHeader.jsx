import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { layoutSpacing } from '../tokens/spacing';

/**
 * Page-level title block with optional actions (toolbar area).
 */
export default function AppPageHeader({ title, subtitle, actions, breadcrumbs }) {
  return (
    <Box
      component="header"
      sx={{
        mb: layoutSpacing.section,
        width: '100%',
      }}
    >
      {breadcrumbs}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {actions && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
