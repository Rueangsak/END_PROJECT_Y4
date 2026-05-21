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
        transition: (theme) =>
          theme.transitions.create(['box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shortest,
          }),
      }}
    >
      <Toolbar sx={{ flexWrap: 'wrap', gap: 1, py: { xs: 1, md: 0 } }}>
        <Typography
          variant="subtitle1"
          component="span"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            letterSpacing: { xs: 0.02, md: 0.08 },
            textTransform: 'uppercase',
            minWidth: 0,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography>
        <AppButton
          component={Link}
          to="/Logout"
          variant="contained"
          color="primary"
          sx={{ flexShrink: 0 }}
        >
          Logout
        </AppButton>
      </Toolbar>
    </AppBar>
  );
}
