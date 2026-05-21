import TextField from '@mui/material/TextField';

/**
 * Standardized text field — full width, consistent density.
 */
export default function AppInput({ margin = 'normal', ...props }) {
  return <TextField margin={margin} {...props} />;
}
