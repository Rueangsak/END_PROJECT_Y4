import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { touchTargetMin } from './responsiveTokens';

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
    <List dense disablePadding sx={{ width: '100%' }}>
      {filter.map((data, index) => (
        <ListItemButton
          key={`${data.featuresWork}-${index}`}
          selected={activeIndex === index}
          onClick={() => onSelect(index)}
          sx={{
            minHeight: touchTargetMin,
            py: 1,
            px: { xs: 1.5, md: 2 },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <ListItemText
            primary={`${data.featuresWork} : ${index + 1}`}
            primaryTypographyProps={{
              variant: 'body2',
              fontWeight: activeIndex === index ? 700 : 500,
              noWrap: true,
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
