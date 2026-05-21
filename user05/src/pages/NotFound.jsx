import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { AppButton, AppEmptyState } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function NotFound() {
  return (
    <Box sx={{ px: layoutSpacing.pageX, py: layoutSpacing.pageY }}>
      <AppEmptyState
        title="Page not found"
        description="The link may be outdated or the page was moved."
        action={
          <AppButton component={Link} to="/Work" variant="contained">
            Go to presentations
          </AppButton>
        }
      />
    </Box>
  );
}
