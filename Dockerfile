# ----------------------
# Base image for common deps
# ----------------------
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++ libc6-compat dumb-init git

# ----------------------
# Build stage
# ----------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache python3 make g++ libc6-compat git

# Copy package.json and install all dependencies (including dev)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Install better-sqlite3 for @nuxt/content
RUN npm install --save-optional better-sqlite3 --legacy-peer-deps || echo "better-sqlite3 installation skipped"

# Copy source code
COPY . .

# Build Nuxt app
RUN npm run build

# Verify .output exists and handle potential location issues
RUN if [ -d "/app/app/.output" ]; then \
        mv /app/app/.output /app/.output && \
        echo ".output moved from /app/app/.output to /app/.output"; \
    elif [ ! -d "/app/.output" ]; then \
        echo "ERROR: .output directory not found!" && \
        find /app -name ".output" -type d 2>/dev/null && \
        exit 1; \
    fi

# ----------------------
# Production stage
# ----------------------
FROM node:20-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001

# Install system dependencies
RUN apk add --no-cache dumb-init libc6-compat wget

# Copy only production deps
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

# Copy built Nuxt output
COPY --from=build --chown=nuxt:nodejs /app/.output ./.output

# Copy public directory
COPY --from=build --chown=nuxt:nodejs /app/public ./public

# Switch to non-root user
USER nuxt

# Expose port
EXPOSE 3000
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", ".output/server/index.mjs"]
