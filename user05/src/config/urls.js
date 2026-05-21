/** Participant app join URL — override with VITE_PARTICIPANT_URL in .env */
const base = import.meta.env.VITE_PARTICIPANT_URL || 'https://teaching-project-a8687.web.app/User/';

export const participantJoinBase = base.endsWith('/') ? base : `${base}/`;

export function participantJoinUrl(docId) {
  return `${participantJoinBase}${docId}`;
}
