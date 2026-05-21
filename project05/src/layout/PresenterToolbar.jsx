import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { AppButton } from '../design-system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function PresenterToolbar({ title = 'presentation', actions = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const actionButtons = actions.map((action) => (
    <AppButton
      key={action.label}
      variant={action.variant || 'contained'}
      color={action.color || 'primary'}
      onClick={action.onClick}
      fullWidth={isMobile}
      disabled={action.disabled}
      loading={action.loading}
    >
      {action.label}
    </AppButton>
  ));

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ gap: 1, flexWrap: { xs: 'wrap', md: 'nowrap' }, py: { xs: 1, md: 0 } }}>
        <Typography
          variant="subtitle1"
          component="h1"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            fontWeight: 700,
            letterSpacing: { xs: 0.05, md: 0.15 },
            textTransform: 'uppercase',
            fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1rem' },
          }}
        >
          {title}
        </Typography>

        {isMobile ? (
          <>
            <AppButton
              variant="outlined"
              size="small"
              aria-label="Open actions menu"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ ml: 'auto' }}
            >
              Menu
            </AppButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              TransitionProps={{ timeout: 180 }}
            >
              {actions.map((action) => (
                <MenuItem
                  key={action.label}
                  disabled={action.disabled || action.loading}
                  onClick={() => {
                    setAnchorEl(null);
                    action.onClick?.();
                  }}
                >
                  {action.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Stack direction="row" spacing={1} sx={{ ml: 'auto', flexWrap: 'wrap' }}>
            {actionButtons}
          </Stack>
        )}
      </Toolbar>
      {isMobile && actions.length > 0 && (
        <Box sx={{ display: 'none' }} aria-hidden>
          {actionButtons}
        </Box>
      )}
    </AppBar>
  );
}
