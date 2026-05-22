import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { AppButton } from '../design-system';
import { colors } from '../design-system/tokens/colors';
import { layoutSpacing } from '../design-system/tokens/spacing';

/**
 * Split auth shell — brand panel (desktop) + centered form.
 */
export default function AuthLayout({ children }) {
  const copy = {
    heading: 'Modern online teaching tools for active classrooms',
    description: 'Create sessions, share QR codes, and view live responses in real time with an instructor-friendly workflow.',
    backHome: 'Back to home',
    backHomeMobile: '<- Back to home',
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          p: 6,
          background: `linear-gradient(145deg, ${colors.brand.primary} 0%, ${colors.brand.secondary} 55%, ${colors.neutral[800]} 100%)`,
          color: 'primary.contrastText',
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 420 }}>
          <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.2 }}>
            Teaching Assistance Tools
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={700} lineHeight={1.25}>
            {copy.heading}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92, lineHeight: 1.7 }}>
            {copy.description}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <AppButton
              component={Link}
              to="/"
              variant="outlined"
              sx={{
                color: 'inherit',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              {copy.backHome}
            </AppButton>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          flex: { xs: 1, md: '0 0 480px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: layoutSpacing.pageX,
          py: { xs: 4, md: 6 },
        }}
      >
        <AppButton
          component={Link}
          to="/"
          variant="text"
          size="small"
          sx={{ alignSelf: 'flex-start', mb: 2, display: { md: 'none' } }}
        >
          {copy.backHomeMobile}
        </AppButton>
        {children}
      </Box>
    </Box>
  );
}
