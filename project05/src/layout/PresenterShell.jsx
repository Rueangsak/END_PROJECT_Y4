import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { layoutSpacing } from './responsiveTokens';

/**
 * Responsive presenter layout (sidebar | canvas | panel).
 * Replaces .page-container* fixed percentage CSS.
 */
export default function PresenterShell({
  toolbar,
  newSlide,
  sidebar,
  main,
  panel,
  showPanel = true,
}) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {toolbar}
      {newSlide}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: { lg: 1920 },
          mx: 'auto',
          px: layoutSpacing.pageX,
          py: layoutSpacing.pageY,
          overflow: 'auto',
        }}
      >
        <Grid container spacing={layoutSpacing.stack} alignItems="stretch">
          <Grid item xs={12} md={3} lg={2} sx={{ order: { xs: 2, md: 1 } }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                minHeight: { xs: 'auto', md: 400 },
                maxHeight: { xs: 220, md: 'none' },
                overflow: 'auto',
              }}
            >
              {sidebar}
            </Box>
          </Grid>

          <Grid item xs={12} md={showPanel ? 6 : 9} lg={showPanel ? 7 : 10} sx={{ order: { xs: 1, md: 2 } }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                minHeight: { xs: 320, md: 480 },
                overflow: 'hidden',
                width: '100%',
              }}
            >
              {main}
            </Box>
          </Grid>

          {showPanel && panel && (
            <Grid item xs={12} md={3} lg={3} sx={{ order: { xs: 3, md: 3 } }}>
              <Stack
                spacing={2}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 2, md: 2.5 },
                  minHeight: { xs: 'auto', md: 400 },
                }}
              >
                {panel}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
