# Frontend

React SPA for the Spotify clone. Built with React 19, Vite, TanStack Router, TanStack Query, Zustand, and Tailwind CSS.

## Structure

```
src/
├── app.tsx               — entry point, providers, router
├── global.css
├── assets/               — SVG logos
├── constants/            — app-wide constants
├── features/
│   ├── audiobar/         — player bar (controls, seek, volume, devices)
│   ├── auth/             — login form
│   ├── entities/         — shared entity UI (hero, cards, skeletons)
│   ├── header/           — top bar (navigation, user menu)
│   ├── footer/
│   ├── library/          — user library (grid/list views)
│   ├── sidebar/          — now playing, queue, devices panels
│   ├── tracks/           — track table, standalone track
│   └── wrappers/
├── hooks/
│   ├── mutations/        — login, logout, settings, queue
│   └── query/            — album, artist, feed, library, search, etc.
├── lib/
│   ├── api/
│   │   ├── http/         — typed HTTP client
│   │   └── schemas/      — Zod schemas (user, track, album, artist, playlist)
│   └── utils, event-bus, query-client, etc.
├── routes/               — TanStack Router file-based routes
│   ├── _main/            — feed, search, settings, playlist, album, artist, genre
│   └── login.tsx
└── ui/                   — shared primitives (buttons, cards, form controls, animations)
```

## Getting Started

```bash
yarn dev:frontend
```

Runs on port 3000. Requires `VITE_BACKEND_URL` in `.env`.
