# Media

Media server for the Spotify clone. Built with NestJS 10 and Sharp for image processing.

## What It Does

- **Images** — serves and resizes images on the fly (Sharp, JPEG output). Supports query params: `w`, `h`, `q`, `fit`.
- **Audio** — streams audio files with HTTP Range request support. Formats: mp3, wav, aac, flac, ogg, aiff, m4a.

Files are served from `public/images/spotify/` and `public/audio/spotify/`. URLs use base64-encoded paths with shortcut prefixes (e.g. `album-cover:id`, `artist-avatar:id`).

## Getting Started

```bash
yarn dev:media
```

Runs on port 3002.

## Environment Variables

- `PORT` — server port (default 3002)
