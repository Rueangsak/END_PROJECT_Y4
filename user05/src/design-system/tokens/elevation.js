import { customShadows } from './shadows';

/** Semantic elevation levels for surfaces. */
export const elevation = {
  flat: 0,
  raised: 1,
  overlay: 2,
  modal: 3,
  popover: 4,
};

export const elevationShadow = {
  [elevation.flat]: customShadows.none,
  [elevation.raised]: customShadows.sm,
  [elevation.overlay]: customShadows.md,
  [elevation.modal]: customShadows.lg,
  [elevation.popover]: customShadows.xl,
};
