import AppBar from '@mui/material/AppBar';
import { AppButton } from '../design-system';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function AppNavBar({ title = 'Teaching Assistance Tools' }) {
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
      <Toolbar sx={{ flexWrap: 'wrap', gap: 1, py: { xs: 1, md: 0 } }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.1rem' },
            minWidth: 0,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>
        <AppButton component={Link} to="/Logout" variant="outlined" color="primary" sx={{ flexShrink: 0 }}>
          Log out
        </AppButton>
      </Toolbar>
    </AppBar>
  );
}
