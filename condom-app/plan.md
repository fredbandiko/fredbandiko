# CONDOM APP — Plan ya Implementation

## Muhtasari wa bidhaa
KDM System ni frontend prototype ya Kiswahili kwa usimamizi wa usambazaji wa kondomu. Prototype inaruhusu Manager/Admin kuona wafanyakazi na PDF zao, kutuma ujumbe, kusajili wafanyakazi na ku-preview/download nyaraka. Worker anaweza ku-upload PDF za mock, kuzituma, kuzifuta na kusoma notification. Hakuna backend, database au authentication ya production; state inahifadhiwa kwenye localStorage kwa demo.

## Stack na muundo
- React + TypeScript + Vite.
- Tailwind CSS kwa utility layer na `src/index.css` kwa design tokens/custom responsive styles.
- React Router kwa routes zinazolindwa na role.
- `src/context/AppContext.tsx` inashikilia local state ya session, workers, documents, notifications na toast.
- `src/components/` ina reusable Sidebar, Topbar, StatCard, Modal, StatusBadge, ProtectedRoute na AppShell.
- `src/pages/` ina Login, Manager Dashboard, Worker Details, Notifications, Register Worker, Documents, Settings, Worker Dashboard na Worker Notifications.
- `public/manus-routes.json` inatangaza routes zote kwa Preview.

## Design iliyochaguliwa: editorial civic operations
**Aesthetic:** dashboard ya civic operations yenye navy ink, mint green na misty white; ni tulivu, ya kuaminika na inasomeka haraka.

**Core principles:** taarifa muhimu ionekane kwa glance; hierarchy iwe wazi; actions ziwe na feedback ya papo hapo; desktop table ibadilike kuwa cards kwenye simu.

**Color philosophy:** navy inaashiria uaminifu na usalama, mint inaashiria afya na progress, misty background inapunguza uchovu wa macho, white inafanya content panels ziwe safi.

**Layout paradigm:** navigation rail ya kushoto na content canvas yenye header iliyoshikizwa; pages zinatenganishwa kwa modules na whitespace, si grid nzito ya box kila sehemu.

**Signature elements:** alama ya KDM yenye dot ya mint, stat cards zenye top accent, rounded panels zenye border nyepesi na status pills zenye rangi ya semantic.

**Interaction philosophy:** kila action ya mock inatoa toast au inline feedback; modal hutumika kwa preview na forms; destructive delete ina confirm ya browser.

**Animation:** transitions fupi za 160ms, fade/slide ndogo kwenye modal na mobile sidebar; hakuna motion ya kupamba bila maana.

**Typography:** Inter/system sans, headings bold zenye tracking tight, body 14–15px yenye line-height nzuri kwa Kiswahili.

**Brand essence:** mfumo rahisi wa kuunganisha taarifa za field na manager — wazi, wa vitendo, unaoaminika. Personality: clear, caring, operational.

**Brand voice:** headlines ni za moja kwa moja (“Karibu, Admin”), CTAs ni za vitendo (“Sajili mfanyakazi”), feedback ni wazi (“PDF imeongezwa kwenye rasimu zako”).

**Wordmark & logo:** square navy mark yenye herufi KDM na accent mint dot; wordmark inatumia uppercase compact.

**Signature brand color:** `#15A67A` mint green.

## Build workflow
1. Install dependencies kwa pnpm na run `pnpm build`.
2. Start Vite kwenye port 3000 kwa Preview.
3. Validate route manifest na typecheck/build.
4. Commit source, README, plan na TODO; kisha push kwenye main na GitHub repository `condom-app`.

## Scope ya baadaye
Backend/database, real authentication, server-side file storage, PDF access control, email/SMS delivery, audit log, pagination, production secrets na API validation vitakuja baadaye.
