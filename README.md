# Spotify Clone

A Spotify clone monorepo built with Yarn Workspaces.

## Structure

```
apps/
├── frontend/   — client application (React 19, Vite, TanStack Router, Zustand, Tailwind CSS)
├── backend/    — server API (NestJS, MongoDB, JWT authentication, Swagger)
└── media/      — media server (NestJS, Sharp for images, audio streaming)
```

## Stack

- **Package manager:** Yarn 4 (workspaces)
- **Linting/formatting:** Biome
- **Deployment:** Docker Swarm, GitHub Actions CI/CD
- **Containerization:** separate Dockerfiles per app (frontend — Nginx, backend and media — Node)

## How It Works

**Frontend** (port 3000) — React SPA. Uses TanStack Router for routing, TanStack Query for API requests, Zustand for state management. Communicates with the backend over HTTP with JWT authentication via cookies.

**Backend** (port 3001) — REST API on NestJS. Uses MongoDB via Mongoose. Handles authentication, user management, library, playlists, albums, search, and feed. API documentation is available via Swagger at `/api`.

**Media** (port 3002) — media server on NestJS. Serves images (processed with Sharp — resizing, JPEG conversion) and audio files (streaming with Range request support). Supported formats: mp3, wav, aac, flac, ogg, aiff, m4a.

## Getting Started

```bash
yarn install
yarn dev
```

`yarn dev` runs all three applications concurrently.

## Environment Variables

**Backend** (`apps/backend/.env`):
- `MONGO_CONNECTION_STRING` — MongoDB connection string
- `JWT_SECRET` — JWT secret
- `CORS_ORIGIN` — allowed CORS origin
- `PORT` — port (default 3001)

**Media** (`apps/media/.env`):
- `PORT` — port (default 3002)

**Frontend** (`.env`):
- `VITE_BACKEND_URL` — backend URL

## Deployment

CI/CD via GitHub Actions. On push to `master`, Docker images are built only for changed applications and deployed to Docker Swarm over SSH. A Telegram notification is sent after deployment.
