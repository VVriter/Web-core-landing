# Multi-stage build for Nuxt application
FROM node:20-alpine AS builder

# Install dependencies
RUN apk add --no-cache git

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nuxt.config.ts ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install wget for health checks
RUN apk add --no-cache wget

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public
COPY --from=builder /app/nuxt.config.ts ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]

