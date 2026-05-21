import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { touchTargetMin } from './responsiveTokens';

const slideTypeLabels = {
  rank: 'Ranking',
  open: 'Open-ended',
  word: 'Word cloud',
  multiple: 'Multiple choice',
  QRcode: 'QR',
};

export default function SlideSidebar({ filter = [], activeIndex = 0, onSelect }) {
  if (!filter.length) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No slides yet
        </Typography>
      </Box>
    );
  }

  return (
    <List dense disablePadding sx={{ width: '100%' }} aria-label="Slides">
      {filter.map((data, index) => {
        const selected = activeIndex === index;
        const label = slideTypeLabels[data.featuresWork] || data.featuresWork;
        return (
          <ListItemButton
            key={`${data.featuresWork}-${index}`}
            selected={selected}
            onClick={() => onSelect(index)}
            aria-current={selected ? 'true' : undefined}
            sx={{
              minHeight: touchTargetMin,
              py: 1,
              px: { xs: 1.5, md: 2 },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <ListItemText
              primary={`${label} · ${index + 1}`}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: selected ? 700 : 500,
                noWrap: true,
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
