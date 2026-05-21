import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppButton, AppCard } from '../design-system';
import { layoutSpacing } from '../design-system/tokens/spacing';
import ParticipantLayout from './ParticipantLayout';

export default function ParticipantQuestion({
  question,
  children,
  primaryAction,
  primaryLabel = 'Submit',
  onPrimary,
  primaryDisabled,
  secondaryAction,
  step,
  totalSteps,
}) {
  return (
    <ParticipantLayout step={step} totalSteps={totalSteps}>
      <AppCard padding="md">
        {question && (
          <Typography variant="h5" component="h2">
            {question}
          </Typography>
        )}
        <Stack spacing={layoutSpacing.form} sx={{ mt: 2 }}>
          {children}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
            {primaryAction || (
              <AppButton variant="contained" onClick={onPrimary} disabled={primaryDisabled} fullWidth>
                {primaryLabel}
              </AppButton>
            )}
            {secondaryAction}
          </Stack>
        </Stack>
      </AppCard>
    </ParticipantLayout>
  );
}
