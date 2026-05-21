# CSS Architecture Cleanup Report

**Date:** 2026-05-21  
**Scope:** `project05` (presenter) + `user05` (participant)  
**Goal:** MUI theme tokens + `sx` + layout primitives; stable visuals; minimal global CSS.

---

## 1. Audit findings

| Issue | Finding |
|--------|---------|
| Duplicated CSS | `.row`, `.head`, fixed widths repeated across `style.css`, `work.css`, `Add.css` — replaced by MUI `Stack` / `Grid` / `DashboardLayout` |
| Dead CSS | 18+ files under `src/CSS/` with zero imports after migration |
| Conflicting styles | Global `style.css` + Bootstrap grid vs MUI `CssBaseline` / theme |
| Global leakage | `App.jsx` imported `App.css` + `style.css`; `index.html` loaded Bootstrap 3 + Font Awesome |
| Unused classes | Hundreds of landing-template selectors (`#menu`, `.navbar-default`, portfolio grid) — routes no longer render `c-main/*` |
| `!important` abuse | Concentrated in `public/css/bootstrap.css` and `style.css` (removed from runtime); reduced in `ChartContainer` / `SlideCanvas` |
| Inconsistent spacing | Magic pixels (`1020px`, `700px`, `padding: 8`) → `layoutSpacing` tokens |
| Inconsistent typography | Mixed Open Sans / Lato / Raleway links → `createAppTheme` typography scale |
| Bootstrap remnants | `btn`, `row`, `navbar-fixed-top` only in unused `c-main/*` and `login/Dashboard.js` |

---

## 2. Target architecture

```
src/
  design-system/          # tokens + createAppTheme + primitives
  layout/                 # shells (PresenterShell, DashboardLayout, ParticipantLayout, ChartPanel)
  styles/global.css       # box-sizing, overflow, #root min-height only (~30 lines)
  index.jsx               # AppThemeProvider + import global.css
```

**Rules:** No component CSS files. No Bootstrap. Chart/slide sizing via layout `sx`.

---

## 3. Removed from build (deleted under `src/CSS/`)

### project05
`App.css`, `style.css`, `index.css`, `Add.css`, `content.css`, `navbar1.css`, `navbar2.css`, `bigpaper.css`, `paperpre.css`, `newslide.css`, `presentation.css`, `work.css`, `open.css`, `login.css`, `forms.css`, `profile.css`, `verifyEmail.css`, `a.css`

### user05
`App.css`, `index.css`, `CSS/style.css`, `open.css`, `navbar2.css`, `bigpaper.css`, `paperpre.css`

`src/CSS/README.md` in each app documents that legacy folder is retired.

---

## 4. Import / HTML changes

| Location | Change |
|----------|--------|
| `project05/src/App.jsx` | Removed `App.css`, `style.css` |
| `user05/src/App.jsx` | Removed `App.css` |
| `project05/index.html` | Vite-only entry; no Bootstrap/jQuery |
| `project05/public/index.html` | Stripped legacy link tags (mirror root) |
| `user05/index.html` | Already clean |
| `project05/src/index.jsx`, `user05/src/index.jsx` | `import './styles/global.css'` |

---

## 5. Component migrations (user05)

| File | Before | After |
|------|--------|-------|
| `Features/Multipleuser.js` | `style.css` + div layout | `ParticipantQuestion` + MUI RadioGroup |
| `Features/Wordclouduser.js` | `style.css` | `ParticipantQuestion` + `AppInput` |
| `show/OpenendShow.js` | `.row` + inline padding | MUI `Chip` + `Stack` |
| `show/RankingShow.js` | `style.css` + `class="row"` | Firebase aggregate + `ChartPanel` |
| `show/MultipleShow.js` | `style.css` | MUI form + `layoutSpacing` |
| `show/WordcloudShow.js` | `style.css` | `Box` + responsive height |

`RankingShowww.js` / `Rankinguser.js` / `Openenduser.js` were already on design system.

---

## 6. Build verification

```bash
cd project05 && npm run build   # ✓ dist CSS ~0.21 kB (global only)
cd user05 && npm run build      # ✓
```

---

## 7. Intentionally retained (not loaded by Vite)

| Path | Reason |
|------|--------|
| `project05/public/css/bootstrap.css`, `style.css`, nivo-lightbox | Historical static assets; **not** referenced by active `index.html`. Safe to delete in a follow-up PR to shrink repo size. |
| `project05/src/c-main/*` | Dead landing template; uses Bootstrap class names but unrouted (`Main.jsx` → `/Work`). Migrate or delete separately. |
| `login/Dashboard.js` | Unused Firebase demo; `class="btn btn-danger"`. |

---

## 8. `!important` status

| Location | Status |
|----------|--------|
| `public/css/*` | Not loaded at runtime |
| `layout/ChartContainer.jsx` | Removed; use `maxWidth` + `width: 100%` |
| `layout/SlideCanvas.jsx` | Removed on both apps |

If Chart.js overflows on a specific slide, fix at `ChartPanel` height / `maintainAspectRatio: false` rather than reintroducing `!important`.

---

## 9. Visual stability notes

- Primary brand color `#0B57D0` preserved in chart datasets and theme primary.
- Slide aspect ratio handled by `SlideCanvas` (replaces fixed 1020×700).
- Participant flows use `ParticipantLayout` / `ParticipantQuestion` for consistent padding (`layoutSpacing.pageX`).

---

## 10. Recommended follow-ups

1. Delete `project05/public/css/` and `public/js/jquery*.js`, `bootstrap.js` to reduce repo size.
2. Remove or migrate `c-main/*` and `login/Dashboard.js`.
3. Add dark-mode toggle wired to `useThemeMode()`.
4. Code-split large routes to address Vite chunk size warnings.
