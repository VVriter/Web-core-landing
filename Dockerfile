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

# Install better-sqlite3 for @nuxt/content (or skip if not needed)
RUN echo "Installing build dependencies..." && \
    npm install --save-optional better-sqlite3 --legacy-peer-deps || echo "better-sqlite3 installation skipped"

# Prepare Nuxt (generates .nuxt directory with all necessary files)
# Using npm run postinstall which calls "nuxt prepare"
RUN echo "Preparing Nuxt..." && \
    npm run postinstall && \
    echo "Verifying .nuxt directory structure:" && \
    ls -la /app/.nuxt/ 2>&1 || echo ".nuxt directory not created" && \
    echo "Checking for tsconfig files:" && \
    ls -la /app/.nuxt/tsconfig*.json 2>&1 && \
    echo "All tsconfig files present, proceeding with build..."

# Build the Nuxt application with verbose output
RUN echo "Starting Nuxt build..." && \
    NODE_ENV=production npm run build && \
    echo "Build completed. Checking for .output..." && \
    echo "Looking for .output directory:" && \
    find /app -name ".output" -type d 2>/dev/null && \
    if [ -d "/app/app/.output" ]; then \
        echo "Found .output in /app/app/.output, moving to /app/.output" && \
        mv /app/app/.output /app/.output && \
        echo ".output moved successfully"; \
    elif [ -d "/app/.output" ]; then \
        echo ".output found in root /app/.output"; \
    else \
        echo "ERROR: .output not found in expected locations!" && \
        find /app -type d -name ".output" 2>/dev/null && \
        exit 1; \
    fi

# Verify .output directory exists and show structure
RUN echo "Final verification of .output..." && \
    if [ ! -d "/app/.output" ]; then \
        echo "ERROR: .output directory not found!" && \
        find /app -name ".output" -type d 2>/dev/null && \
        exit 1; \
    fi && \
    echo ".output structure:" && \
    ls -la /app/.output/ && \
    echo ".output/server structure:" && \
    ls -la /app/.output/server/ 2>&1 || echo "No server directory"

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
