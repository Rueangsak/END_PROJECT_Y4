# project05 - Presenter/Creator App

`project05` is the teacher/presenter side of the interactive classroom system in this repository.
It is responsible for account login, creating presentation forms, editing question slides, generating participant QR links, and controlling live session data stored in Firebase.

## What This App Does

- Authenticate users (login/signup/logout).
- Create and manage `Form` documents in Firestore.
- Build slide-based questions with multiple interaction types.
- Save updates to slide content (`filter`) back to Firestore.
- Open presentation view and result view for a selected form.
- Generate QR code that points participants to the `user05` app route: `.../User/:docId`.
- Clear submitted answers for a form session when needed.

## Main Routes

Defined in `src/App.jsx`:

- `/` - landing/main page
- `/Login` - login page
- `/SignUp` - registration page
- `/Logout` - logout action/page
- `/Work` - authenticated workspace for form list and management
- `/Open/:docId` - editor + presenter page for a selected form
- `/Show/:docId` - read-only style display page for selected form

## Slide Types

When creating slides from `New Slide`, the app stores each slide as an object in `filter[]` with `featuresWork`:

- `rank` - ranking/poll style
- `open` - open-ended answer
- `word` - word cloud style answer aggregation
- `multiple` - multiple choice with per-option `status` (correct/incorrect)
- `QRcode` - supported in parts of display flow

## Firestore Data Model

Firebase project: `teaching-project-a8687`

- Collection: `Form`
  - Document fields:
    - `uid` (owner user id)
    - `nameWork` (form/session title)
    - `filter` (array of slide definitions)
  - Subcollection: `answers`
    - `answer` (string)
    - `user` (participant identifier)
    - `index` (slide index in `filter`)
    - `status` (optional boolean, used by multiple-choice logic)

## Key Files

- `src/App.jsx` - route setup
- `src/pages/Work.jsx` - authenticated workspace page
- `src/c-createfile/AddForm.jsx` - create/edit/delete form records
- `src/pages/Open.jsx` - main presenter editor (save, QR, clear answers)
- `src/c-presen/newslide.jsx` - add slide types
- `src/c-presen/content.jsx` - edit selected slide content
- `src/firebase/serviceApi.js` - Firestore access layer for forms
- `src/firebase/firebase.js` - Firebase initialization

## Environment

Copy `.env.example` to `.env.local` and set the deployed participant app URL:

```bash
VITE_PARTICIPANT_URL=https://your-user05-host.web.app/User/
```

Used for QR codes in `Open.jsx` (`src/config/urls.js`).

## Firestore Security Rules

Rules live at repo root: `firestore.rules`. Deploy after review:

```bash
firebase deploy --only firestore:rules
```

## Local Development

### Prerequisites

- Node.js 18+ recommended
- npm (comes with Node.js)

### Install

```bash
cd project05
npm install
```

### Start

```bash
npm run dev
```

Default Vite port is `3001` (configured in `vite.config.mjs`).

## Build

```bash
npm run build
```

## Firebase Hosting

Files:

- `.firebaserc` -> default project `teaching-project-a8687`
- `firebase.json` -> hosting `public: dist`, SPA rewrite to `index.html`

Deploy:

```bash
npm run build
firebase deploy --only hosting
```

## How It Connects To `user05`

`project05` creates and manages forms, then generates participant access through a QR code URL:

- Configured via `VITE_PARTICIPANT_URL` (default: `https://teaching-project-a8687.web.app/User/:docId`)

That URL is handled by `user05`, where participants submit answers.
Both apps read/write the same Firestore project and cooperate through the shared `Form` + `answers` schema.
