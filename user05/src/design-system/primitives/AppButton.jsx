import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { touchTargetMin } from '../tokens/spacing';

const sizeMap = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

/**
 * Standardized button — touch targets, loading state, theme motion.
 */
export default function AppButton({
  size = 'medium',
  fullWidth,
  loading = false,
  disabled,
  children,
  sx,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <Button
      size={sizeMap[size] || 'medium'}
      fullWidth={fullWidth}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      sx={{
        minHeight: size === 'small' ? 36 : touchTargetMin,
        position: 'relative',
        ...(loading && {
          color: 'transparent',
          '& .MuiButton-startIcon, & .MuiButton-endIcon': { visibility: 'hidden' },
        }),
        ...sx,
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={size === 'small' ? 18 : 22}
          color="inherit"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            ml: '-11px',
            mt: '-11px',
          }}
          aria-hidden
        />
      )}
      {children}
    </Button>
  );
}
