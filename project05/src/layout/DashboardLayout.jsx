import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AppPageHeader, FadeIn } from '../design-system';
import { containerMaxWidth, layoutSpacing } from '../design-system/tokens/spacing';
import AppNavBar from './AppNavBar';

/**
 * Admin dashboard shell: top nav + page header + constrained content width.
 */
export default function DashboardLayout({
  title,
  subtitle,
  actions,
  children,
  showNav = true,
  maxWidth = 'lg',
}) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {showNav && <AppNavBar />}
      <Container
        maxWidth={maxWidth}
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: containerMaxWidth.ultrawide,
          py: layoutSpacing.pageY,
          px: layoutSpacing.pageX,
        }}
      >
        {(title || subtitle || actions) && (
          <FadeIn>
            <AppPageHeader title={title} subtitle={subtitle} actions={actions} />
          </FadeIn>
        )}
        <FadeIn delay={40}>
          <Box component="main" sx={{ width: '100%' }}>
            {children}
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
}
