import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import { AppButton } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function AppNavBar({ title = 'Teaching Assistance Tools' }) {
  const location = useLocation();
  const onWork = location.pathname === '/work';
  const labels = { work: 'Presentations', home: 'Home', logout: 'Sign out' };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          py: { xs: 1, md: 0.5 },
          px: layoutSpacing.pageX,
          maxWidth: 1920,
          width: '100%',
          mx: 'auto',
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/work"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            minWidth: 0,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          {!onWork && (
            <AppButton component={Link} to="/work" variant="text" size="small">
              {labels.work}
            </AppButton>
          )}
          <AppButton component={Link} to="/" variant="text" size="small" sx={{ color: 'text.secondary' }}>
            {labels.home}
          </AppButton>
          <AppButton component={Link} to="/Logout" variant="outlined" color="primary" size="small" sx={{ flexShrink: 0 }}>
            {labels.logout}
          </AppButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
