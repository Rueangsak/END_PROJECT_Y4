import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { Link } from 'react-router-dom';
import { AppButton } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';

export default function PublicNavBar({
  links = [],
  currentLang = 'th',
  onLanguageChange,
  brand = 'Teaching Assistance Tools',
  loginLabel = 'เข้าสู่ระบบ',
  startLabel = 'เริ่มใช้งาน',
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isThai = currentLang === 'th';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          gap: 1,
          py: { xs: 1, md: 0.5 },
          px: layoutSpacing.pageX,
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
        }}
      >
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: 'text.primary',
            textDecoration: 'none',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          {brand}
        </Typography>

        {!isMobile && (
          <Stack direction="row" spacing={0.5} sx={{ mr: 1 }}>
            {links.map((item) => (
              <AppButton
                key={item.id}
                component="a"
                href={`#${item.id}`}
                variant="text"
                color="inherit"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                {item.label}
              </AppButton>
            ))}
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              p: '3px',
              borderRadius: 99,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <AppButton
              variant="text"
              size="small"
              onClick={() => onLanguageChange?.('en')}
              aria-pressed={!isThai}
              sx={{
                minWidth: 40,
                px: 1.5,
                borderRadius: 99,
                color: !isThai ? 'text.primary' : 'text.secondary',
                bgcolor: !isThai ? 'rgba(0,0,0,0.08)' : 'transparent',
                fontWeight: !isThai ? 700 : 500,
              }}
            >
              EN
            </AppButton>
            <AppButton
              variant="text"
              size="small"
              onClick={() => onLanguageChange?.('th')}
              aria-pressed={isThai}
              sx={{
                minWidth: 40,
                px: 1.5,
                borderRadius: 99,
                color: isThai ? 'text.primary' : 'text.secondary',
                bgcolor: isThai ? 'rgba(0,0,0,0.08)' : 'transparent',
                fontWeight: isThai ? 700 : 500,
              }}
            >
              TH
            </AppButton>
          </Box>
          <AppButton component={Link} to="/login" variant="outlined" size="small">
            {loginLabel}
          </AppButton>
          <AppButton component={Link} to="/Work" variant="contained" size="small">
            {startLabel}
          </AppButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
