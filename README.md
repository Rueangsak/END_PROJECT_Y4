# END_PROJECT_Y4

Monorepo for an interactive classroom/presentation system built with React and Firebase.
The repository contains two frontend applications that work together on the same Firestore backend.

## Repository Structure

- `project05/` - presenter/creator app (teacher workspace)
- `user05/` - participant and live result app
- `.cursor/` - Cursor project rules and skills shared across this repository

## System Overview

This project is split by responsibility:

- `project05` handles account flow, form creation, slide editing, save/update operations, session controls, and QR generation.
- `user05` handles participant answering flow and live result rendering from shared Firestore data.

Both apps use Firebase project `teaching-project-a8687` and the same Firestore collections.

## Core Data Model

Firestore collection:

- `Form`
  - `uid` - owner id
  - `nameWork` - form name
  - `filter` - array of slide objects
  - subcollection `answers`
    - `answer`
    - `user`
    - `index`
    - `status` (optional, mostly multiple-choice)

Slide type marker:

- `featuresWork` in each `filter` item (`rank`, `open`, `word`, `multiple`, `QRcode`)

## End-to-End Flow

1. Teacher signs in to `project05`.
2. Teacher creates a form and configures slides.
3. Teacher saves slide configuration to Firestore.
4. Teacher shares participant URL (typically via QR) including `docId`.
5. Participants open `user05/User/:docId` and submit answers.
6. Live results update on `user05/Open/:docId` and/or presenter displays.

## Local Development

### Prerequisites

- Node.js 18+ recommended
- npm
- Firebase CLI (for deploy): `npm i -g firebase-tools`

### Install Dependencies

```bash
cd project05
npm install

cd ../user05
npm install
```

### Run Both Apps in Parallel (PowerShell)

Terminal 1 (`project05`):

```powershell
cd D:\git\END_PROJECT_Y4\project05
npm run dev
```

Terminal 2 (`user05`):

```powershell
cd D:\git\END_PROJECT_Y4\user05
npm run dev
```

Open:

- `http://localhost:3001` for `project05`
- `http://localhost:3002` for `user05`

## Build and Deploy

Each app has its own `firebase.json` and `.firebaserc`.

For each app:

```bash
npm run build
firebase deploy --only hosting
```

Run commands inside the target project directory (`project05` or `user05`).

## Cursor Project Guidance

Installed project-level AI guidance:

- Rule: `.cursor/rules/karpathy-guidelines.mdc`
- Skill: `.cursor/skills/karpathy-guidelines/SKILL.md`

These are shared for both applications in this monorepo.

## Quick Links

- Firebase Console: [teaching-project-a8687](https://console.firebase.google.com/u/0/project/teaching-project-a8687/overview)
- `project05` docs: `project05/README.md`
- `user05` docs: `user05/README.md`
