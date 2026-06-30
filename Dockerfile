# # ─── Base deps ────────────────────────────────────────────────────────────────
# FROM node:22-slim AS deps
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --omit=dev=false

# # ─── Builder ─────────────────────────────────────────────────────────────────
# FROM node:22-slim AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN mkdir -p /app/.next/cache
# RUN npm run build

# # ─── Runner ──────────────────────────────────────────────────────────────────
# FROM node:22-slim AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# ENV PORT=3000
# ENV HOSTNAME=0.0.0.0

# # non-root user
# RUN addgroup --system --gid 1001 nodejs \
#   && adduser --system --uid 1001 nextjs

# # Copy standalone server + static assets
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/.next/cache ./.next/cache

# RUN chown -R nextjs:nodejs /app/.next

# USER nextjs
# EXPOSE 3000
# CMD ["node", "server.js"]

# ─── Base deps ────────────────────────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ─── Builder ─────────────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# 👇 Catch the public variables from GitHub Actions
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=$NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

ARG NEXT_PUBLIC_FLENTRA_SUPPORT_EMAIL
ENV NEXT_PUBLIC_FLENTRA_SUPPORT_EMAIL=$NEXT_PUBLIC_FLENTRA_SUPPORT_EMAIL


RUN mkdir -p /app/.next/cache
RUN npm run build

# ─── Runner ──────────────────────────────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy standalone server + static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/cache ./.next/cache

RUN chown -R nextjs:nodejs /app/.next

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]