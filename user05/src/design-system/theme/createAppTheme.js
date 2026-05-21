import { createTheme } from '@mui/material/styles';
import { darkPalette, lightPalette } from '../tokens/colors';
import { breakpointValues } from '../tokens/breakpoints';
import { shapeBorderRadius } from '../tokens/radius';
import { spacingUnit } from '../tokens/spacing';
import { typographyScale } from '../tokens/typography';
import { motionDuration } from '../motion/durations';
import { motionEasing } from '../motion/easing';

const focusVisible = {
  outline: '2px solid',
  outlineColor: 'primary.main',
  outlineOffset: 2,
};

/**
 * @param {'light' | 'dark'} mode
 */
export function createAppTheme(mode = 'light') {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    breakpoints: { values: breakpointValues },
    spacing: spacingUnit,
    shape: { borderRadius: shapeBorderRadius },
    typography: typographyScale,
    transitions: {
      duration: {
        shortest: motionDuration.fast,
        shorter: motionDuration.fast,
        short: motionDuration.normal,
        standard: motionDuration.normal,
        complex: motionDuration.slow,
        enteringScreen: motionDuration.normal,
        leavingScreen: motionDuration.fast,
      },
      easing: {
        easeInOut: motionEasing.standard,
        easeOut: motionEasing.decelerate,
        easeIn: motionEasing.standard,
        sharp: motionEasing.emphasized,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { overflowX: 'hidden' },
          body: { overflowX: 'hidden', maxWidth: '100vw' },
          '#root': {
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
          },
          img: { maxWidth: '100%', height: 'auto' },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
              scrollBehavior: 'auto !important',
            },
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
        styleOverrides: {
          root: {
            '&:focus': { outline: 'none' },
            '&:focus-visible': focusVisible,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: 'none',
            borderRadius: 10,
            fontWeight: 600,
            transition: theme.transitions.create(
              ['background-color', 'box-shadow', 'border-color', 'color', 'transform'],
              { duration: theme.transitions.duration.shortest }
            ),
            '@media (hover: hover)': {
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            },
            '&:active': {
              transform: 'translateY(0) scale(0.98)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover, &:active': { transform: 'none' },
            },
          }),
          sizeSmall: { minHeight: 36, padding: '6px 12px' },
          sizeMedium: { minHeight: 44, padding: '8px 16px' },
          sizeLarge: { minHeight: 48, padding: '10px 20px' },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['background-color', 'transform'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:active': { transform: 'scale(0.94)' },
            '@media (prefers-reduced-motion: reduce)': {
              '&:active': { transform: 'none' },
            },
          }),
        },
      },
      MuiTextField: {
        defaultProps: { fullWidth: true, size: 'medium' },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            transition: theme.transitions.create(['box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '& .MuiOutlinedInput-notchedOutline': {
              transition: theme.transitions.create(['border-color'], {
                duration: theme.transitions.duration.shortest,
              }),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.text.secondary,
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${theme.palette.primary.main}22`,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 14,
            backgroundImage: 'none',
            transition: theme.transitions.create(['box-shadow', 'border-color', 'transform'], {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        },
      },
      MuiDialog: {
        defaultProps: {
          TransitionProps: { timeout: motionDuration.normal },
        },
        styleOverrides: {
          paper: {
            borderRadius: 16,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['background-color', 'padding-left'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&.Mui-selected': {
              borderLeft: `3px solid ${theme.palette.primary.main}`,
              pl: 'calc(16px - 3px)',
            },
          }),
        },
      },
      MuiMenu: {
        defaultProps: {
          TransitionProps: { timeout: motionDuration.fast },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['background-color'], {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar: ({ theme }) => ({
            transition: theme.transitions.create(['transform'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeOut,
            }),
          }),
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          circle: {
            strokeLinecap: 'round',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['opacity', 'transform'], {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '@media (hover: hover)': {
              '&:hover': {
                boxShadow: theme.shadows[1],
              },
            },
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create(['color', 'opacity'], {
              duration: theme.transitions.duration.shortest,
            }),
          }),
        },
      },
    },
  });
}

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');
