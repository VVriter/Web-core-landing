# Multi-stage build for Nuxt SSR production
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prepare Nuxt (generates .nuxt directory)
RUN echo "Preparing Nuxt..." && \
    npm run postinstall || npx nuxt prepare || true

# Build the Nuxt application with verbose output
RUN echo "Starting Nuxt build..." && \
    NODE_ENV=production npm run build && \
    echo "Build completed. Checking for .output..." && \
    ls -la /app/ | head -20 && \
    echo "Looking for .output directory:" && \
    find /app -name ".output" -type d 2>/dev/null || echo "No .output found" && \
    echo "Checking current directory contents:" && \
    ls -la /app/.output 2>&1 || (echo ".output directory not found!" && exit 1)

# Verify .output directory exists and show structure
RUN echo "Checking for .output after build..." && \
    ls -la /app/ && \
    if [ ! -d "/app/.output" ]; then \
        echo "ERROR: .output directory not found after build!" && \
        echo "Checking if build completed..." && \
        ls -la /app/ | grep -E "\.(nuxt|data|output)" && \
        echo "Trying to list .output even if it doesn't exist:" && \
        ls -la /app/.output 2>&1 || true && \
        exit 1; \
    fi && \
    echo ".output structure:" && \
    ls -la /app/.output/

# Production image with Node.js to run Nuxt SSR
FROM base AS runner
RUN apk add --no-cache wget
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

# Copy built application and config
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public
COPY --from=builder /app/nuxt.config.ts ./nuxt.config.ts 2>/dev/null || true

EXPOSE 3000

# Start Nuxt SSR server
CMD ["node", ".output/server/index.mjs"]
