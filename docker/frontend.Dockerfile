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

ENV VITE_BACKEND_URL=https://api.sptf.pyromatic.ru/

COPY --from=deps /app ./
COPY . .

RUN yarn build:frontend

# --- Production ---
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location /assets/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    location = /health {\n\
        default_type application/json;\n\
        return 200 '"'"'{"status":"ok"}'"'"';\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
