# CONDOM APP — KDM System

CONDOM APP ni mfumo wa demo wa kusimamia taarifa za usambazaji wa kondomu. Manager/Admin anaweza kuona workers, documents na notifications; worker anaweza kuingia, kupakia PDF, kutuma document, kuona status na kusoma ujumbe.

## Hali ya sasa

Hii ni **frontend prototype/demo** ya React + TypeScript + Vite. Authentication, workers, documents na notifications huhifadhiwa kwenye `localStorage` ya browser ili demo iweze kubaki na state baada ya refresh kwenye browser hiyo. Hakuna backend, database, real PDF object storage, password hashing, multi-device sync, audit trail, virus scanning au production-grade authorization.

Usitumie credentials za demo kwa taarifa halisi za watu.

## Features

- Manager dashboard yenye worker search/filter na summary cards.
- Worker dashboard yenye PDF drag-and-drop upload, PDF-only validation na limit ya 10MB.
- Document preview/download ya mock PDF, send na delete kwa worker.
- Notification center yenye recipient filtering, unread counts, read state na kutuma ujumbe.
- Worker registration ya demo inayohifadhi account ndani ya browser na kuzuia duplicate usernames.
- Protected routes kwa manager na worker.
- Responsive sidebar/drawer, mobile layouts, accessible labels na keyboard focus states.

## Demo credentials

| Role | Username | Password |
| --- | --- | --- |
| Manager / Admin | `admin` | `123` |
| Worker | `mfanyakazi` | `123` |

Accounts zinazoundwa kupitia Manager > Sajili Mfanyakazi zinaweza kujaribiwa kwenye browser hiyo kwa username na password uliyochagua. Hii ni behavior ya demo tu; password haipaswi kuhifadhiwa hivi kwenye production.

## Run locally

Requirements: Node.js 20+, pnpm 10.6+.

```bash
pnpm install
pnpm dev
```

Fungua `http://localhost:3000`.

## Verify and build

```bash
pnpm build
pnpm preview
```

`pnpm build` huendesha TypeScript project build na Vite production build. Output huwekwa kwenye `dist/`.

## GitHub Pages deployment

Repository hii hutumia workflow iliyopo kwenye `.github/workflows/deploy-pages.yml`. Workflow hu-build `condom-app/`, huunda `404.html` kwa SPA refresh fallback, na hu-deploy kupitia GitHub Pages.

Ili kuamilisha deployment kwenye GitHub:

1. Fungua repository **Settings > Pages**.
2. Chagua **GitHub Actions** kama source.
3. Push mabadiliko kwenye `main`, au endesha workflow kwa **Actions > Deploy Condom App to GitHub Pages > Run workflow**.
4. URL inayotarajiwa ni `https://fredbandiko.github.io/fredbandiko/` baada ya workflow kufanikiwa.

Vite na React Router zimewekwa kutumia base path ya `/fredbandiko/` kwenye production, hivyo assets na nested routes zifanye kazi kwenye project URL hiyo.

## Production roadmap

Kabla ya kutumia mfumo huu kwa taarifa halisi, ongeza backend yenye secure authentication/password hashing, role-based server authorization, database ya users/workers/documents/notifications, private object storage ya PDF, server-side validation, audit logs, password reset, rate limiting na virus scanning. GitHub Pages inaweza kuh-host frontend ya static pekee; haiwezi kuendesha Node.js backend au private database.

## Main files

- `src/main.tsx` — routes na providers.
- `src/context/AppContext.tsx` — demo auth, state na localStorage persistence.
- `src/data.ts` — initial demo data.
- `src/pages/` — Manager, Worker, Documents, Notifications, Register na Settings screens.
- `src/components/` — shell, navigation, reusable cards, modal na badges.
- `vite.config.ts` — Vite base path na dev server.
- `../.github/workflows/deploy-pages.yml` — GitHub Pages build/deploy workflow.
