import Box from '@mui/material/Box';

/** Keeps charts (Chart.js) within viewport without horizontal scroll. */
export default function ChartContainer({ children, minHeight = 240 }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minHeight,
        height: { xs: 280, sm: 320, md: 400 },
        position: 'relative',
        overflow: 'hidden',
        '& > div, & canvas': {
          maxWidth: '100%',
          width: '100%',
        },
      }}
    >
      {children}
    </Box>
  );
}
