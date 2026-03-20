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

RUN yarn build:backend

# --- Production ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs -g 1001
RUN adduser -S appuser -u 1001 -G nodejs

COPY --from=builder --chown=appuser:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules

USER appuser

EXPOSE 3001

CMD ["node", "apps/backend/dist/main.js"]
