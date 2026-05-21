import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FadeIn from '../motion/FadeIn';
import { layoutSpacing } from '../tokens/spacing';

/**
 * Vertical section with title and consistent internal spacing.
 */
export default function AppSection({
  title,
  subtitle,
  children,
  spacing = layoutSpacing.stack,
  animate = true,
  sx,
}) {
  const body = (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: '100%',
        mb: layoutSpacing.section,
        ...sx,
      }}
    >
      <Stack spacing={spacing}>
        {(title || subtitle) && (
          <Box>
            {title && (
              <Typography variant="h6" component="h2">
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
        {children}
      </Stack>
    </Box>
  );

  return animate ? <FadeIn>{body}</FadeIn> : body;
}
