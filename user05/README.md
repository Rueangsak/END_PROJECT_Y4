# user05 - Participant/Live Display App

`user05` is the participant-facing and live-display side of the interactive classroom system.
It consumes form data created in `project05`, allows users to answer questions via `docId`, and renders real-time aggregated results.

## What This App Does

- Accept participant access through `/User/:docId`.
- Ask for participant identifier (name/student code) before answering.
- Serve question flow by slide type (`rank`, `open`, `word`, `multiple`).
- Submit answers to Firestore subcollection `answers`.
- Display live results on `/Open/:docId`.
- Legacy share routes (`/OpenendShow`, etc.) load a single slide via `ShowSlidePage` + live Firestore data.

## Main Routes

Defined in `src/App.jsx`:

- `User/:docId` - participant answering flow
- `Open/:docId` - live presentation/result page
- `/OpenendShow/:docId/:index` - open-ended result view
- `/RankingShow/:docId/:index` - ranking result view
- `/WordcloudShow/:docId/:index` - word cloud result view
- `/MultipleShow/:docId/:index` - multiple-choice result view

## Runtime Flow

1. Presenter creates/edits a form in `project05`.
2. Presenter shares QR/link with `docId`.
3. Participant opens `user05/User/:docId`.
4. Participant submits answers slide-by-slide.
5. Answers are stored in `Form/{docId}/answers`.
6. `user05/Open/:docId` listens to Firestore snapshots and updates results live.

## Firestore Data Model (Shared)

Firebase project: `teaching-project-a8687`

- Collection: `Form`
  - `filter[]` contains slide definitions and question content
- Subcollection: `answers`
  - `answer`
  - `user`
  - `index` (current slide index)
  - `status` (used by multiple-choice mode)

## Key Files

- `src/App.js` - route registration
- `src/function/User.js` - participant question flow + answer submission
- `src/pages/Open.jsx` - live presenter/observer display page
- `src/pages/bigpaper.jsx` - mode-aware rendering container
- `src/Features/*.js` - participant answer components by type
- `src/show/*.js` - result display components by type
- `src/firebase/serviceApi.js` - Firestore API helpers
- `src/firebase/firebase.js` - Firebase initialization

## Firestore Security Rules

Shared with `project05` — see `../firestore.rules` and deploy:

```bash
firebase deploy --only firestore:rules
```

## Local Development

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
cd user05
npm install
```

### Start

```bash
npm run dev
```

Default Vite port is `3002` (configured in `vite.config.mjs`).

## Build

```bash
npm run build
```

## Firebase Hosting

Files:

- `.firebaserc` -> default project `teaching-project-a8687`
- `firebase.json` -> hosting from `dist` with SPA rewrite

Deploy:

```bash
npm run build
firebase deploy --only hosting
```

## Notes

- This app intentionally does not include full teacher-side form authoring (`Newslide`, management dashboard, auth workflow). Those belong to `project05`.
- Both applications share one backend, so schema consistency between slide `filter` and `answers` is critical.
