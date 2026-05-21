import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { elevation } from '../tokens/elevation';
import { layoutSpacing } from '../tokens/spacing';

const paddingMap = {
  none: 0,
  sm: layoutSpacing.cardCompact,
  md: layoutSpacing.card,
  lg: { xs: 3, md: 4 },
};

/**
 * Surface card with consistent padding; optional interactive hover.
 */
export default function AppCard({
  title,
  subtitle,
  children,
  padding = 'md',
  maxWidth,
  elevationLevel = elevation.flat,
  interactive = false,
  sx,
  ...props
}) {
  return (
    <Paper
      elevation={elevationLevel}
      sx={{
        width: '100%',
        maxWidth: maxWidth ?? '100%',
        p: paddingMap[padding] ?? paddingMap.md,
        border: 1,
        borderColor: 'divider',
        ...(interactive && {
          '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.shadows[2],
            },
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {(title || subtitle) && (
        <Stack spacing={0.5} sx={{ mb: children ? 2 : 0 }}>
          {title && (
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </Paper>
  );
}
