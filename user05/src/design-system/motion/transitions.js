import { motionDuration } from './durations';
import { motionEasing } from './easing';

export const motionTransition = {
  fast: `${motionDuration.fast}ms ${motionEasing.standard}`,
  normal: `${motionDuration.normal}ms ${motionEasing.standard}`,
  slow: `${motionDuration.slow}ms ${motionEasing.decelerate}`,
};

/** Props for MUI transition components */
export function getTransitionTimeout(reducedMotion, normal = motionDuration.normal) {
  return reducedMotion ? motionDuration.instant : normal;
}

/** Focus ring — visible only for keyboard users */
export const focusVisibleRing = {
  '&:focus': { outline: 'none' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
};

/** Subtle hover lift — disabled when reduced motion or touch-only */
export const hoverLiftSx = {
  '@media (hover: hover) and (prefers-reduced-motion: no-preference)': {
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&:hover': { transform: 'none' },
  },
};

/** Press feedback for buttons */
export const pressFeedbackSx = {
  '&:active': {
    transform: 'scale(0.98)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&:active': { transform: 'none' },
  },
};
