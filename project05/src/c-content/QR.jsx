import Typography from '@mui/material/Typography';
import { AppButton, AppSection } from '../design-system';

export default function QR(props) {
  return (
    <AppSection title="QR code">
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Generate a QR code for this slide in the canvas preview.
      </Typography>
      <AppButton color="error" variant="contained" onClick={() => props.deteleFilter(props.indexFilterShow)}>
        Delete Slide
      </AppButton>
    </AppSection>
  );
}
