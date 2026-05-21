/** Slides participants answer (excludes QR-only slides). */
export function countParticipantSteps(filter = []) {
  return filter.filter((s) => s.featuresWork !== 'QRcode').length;
}

export function participantStepIndex(filter = [], activeIndex = 0) {
  return filter.slice(0, activeIndex + 1).filter((s) => s.featuresWork !== 'QRcode').length;
}
