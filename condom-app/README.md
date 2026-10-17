# CONDOM APP — KDM System

Frontend prototype ya **Mfumo wa Usimamizi wa Usambazaji wa Kondomu**. App hii inaonyesha namna Manager/Admin anavyoweza kupokea na kufuatilia taarifa za PDF kutoka kwa wafanyakazi, huku worker akiweza kupakia, kutuma na kusimamia documents zake.

## Jinsi ya ku-run

```bash
pnpm install
pnpm dev
```

Fungua `http://localhost:3000`. Kwa production build:

```bash
pnpm build
pnpm preview
```

## Demo credentials

| Role | Username | Password |
| --- | --- | --- |
| Manager / Admin | `admin` | `123` |
| Mfanyakazi | `mfanyakazi` | `123` |

Credentials hizi ni za demo prototype pekee; hazipaswi kutumika kama authentication ya production.

## Features zilizopo

Manager ana Manager Dashboard yenye summary cards, search na filter ya wafanyakazi, worker details, document archive, preview/download ya mock PDF, notification center, kutuma ujumbe kwa worker mmoja au wote, kusajili worker mpya na settings screen.

Worker ana dashboard yenye summary cards, drag-and-drop PDF upload, PDF-only validation, upload loading state, mock documents list, preview, send, download na delete; pia ana notification inbox inayoruhusu kufungua ujumbe na ku-mark read.

Navigation inalindwa kwa role kupitia React Router. Login state huhifadhiwa kwenye localStorage kwa demo ili refresh ibaki kwenye session. Data yote ni mock/local state na huanza upya ukireload kwa mazingira mapya.

## Files muhimu

- `src/main.tsx` — app entry point, routing na protected routes.
- `src/context/AppContext.tsx` — mock session, workers, documents, notifications na actions.
- `src/data.ts` — mock workers Asha Mushi, Juma Said, Neema Joseph na sample notifications/documents.
- `src/components/` — AppShell, Sidebar, Topbar, StatCard, Modal, StatusBadge na ProtectedRoute.
- `src/pages/` — screens zote za manager na worker.
- `src/index.css` — design system, dashboard layout na responsive styles.
- `public/manus-routes.json` — page route manifest ya Preview.

## Mock features zitakazohitaji backend baadaye

Kwa production, project itahitaji server authentication yenye password hashing na roles, database ya users/documents/notifications, object storage yenye access control kwa PDF, audit trail, real-time notification delivery, server-side validation, virus scanning, pagination, API error handling na password reset. Download/preview ya sasa inatumia mock Blob; hakuna PDF inayopakiwa kwenye storage halisi.

## Design

UI inatumia navy dark blue, mint green, white na misty light-gray background. Desktop ina sidebar na data tables; kwenye simu sidebar inakuwa drawer na rows zinajipanga kwa matumizi ya touch.
