# Backend

REST API for the Spotify clone. Built with NestJS 10, MongoDB (Mongoose), and JWT authentication.

## Modules

- **auth** — login/logout, JWT in HTTP-only cookies, global `AuthGuard`
- **user** — profile, settings, playback queue, feed
- **library** — user's saved tracks, albums, artists, playlists
- **playlist** — CRUD for playlists
- **album** — album pages and cards
- **artist** — artist pages and cards
- **track** — track data, now playing
- **search** — search across all entities
- **personal** — personalized recommendations

## Getting Started

```bash
yarn dev:backend
```

Runs on port 3001. Swagger docs available at `/api`.

## Environment Variables

- `MONGO_CONNECTION_STRING` — MongoDB connection string
- `JWT_SECRET` — JWT secret key
- `CORS_ORIGIN` — allowed CORS origin
- `PORT` — server port (default 3001)
