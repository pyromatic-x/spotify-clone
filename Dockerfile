FROM node:22-alpine AS base
RUN corepack enable

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
COPY apps/media/package.json apps/media/
RUN yarn install --immutable

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
COPY . .

RUN yarn build

# --- Production ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/media/dist ./apps/media/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/media/package.json ./apps/media/package.json
COPY --from=builder /app/node_modules ./node_modules

COPY <<'EOF' /app/entrypoint.sh
#!/bin/sh
node apps/backend/dist/main.js &
BACKEND_PID=$!
node apps/media/dist/main.js &
MEDIA_PID=$!

trap "kill $BACKEND_PID $MEDIA_PID 2>/dev/null; exit" SIGTERM SIGINT

while true; do
  if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Backend crashed, exiting"
    kill $MEDIA_PID 2>/dev/null
    exit 1
  fi
  if ! kill -0 $MEDIA_PID 2>/dev/null; then
    echo "Media crashed, exiting"
    kill $BACKEND_PID 2>/dev/null
    exit 1
  fi
  sleep 2
done
EOF
RUN chmod +x /app/entrypoint.sh

USER appuser

EXPOSE 3001 3002

CMD ["/app/entrypoint.sh"]
