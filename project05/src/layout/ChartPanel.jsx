import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppEmptyState } from '../design-system';
import ChartContainer from './ChartContainer';

/**
 * Chart block with title and empty state — live results / analytics.
 */
export default function ChartPanel({ title, subtitle, empty, emptyDescription, children }) {
  if (empty) {
    return (
      <AppEmptyState
        title={empty}
        description={emptyDescription || 'Responses will appear here as participants submit answers.'}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {(title || subtitle) && (
        <Box sx={{ mb: 2 }}>
          {title && (
            <Typography variant="subtitle1" component="h3" fontWeight={600}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      <ChartContainer>{children}</ChartContainer>
    </Box>
  );
}
