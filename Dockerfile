# Build and Run Stage
FROM node:22-alpine

WORKDIR /app

# Enable Corepack for Yarn 4
RUN corepack enable

# Copy configuration files
COPY package.json yarn.lock .yarnrc.yml ./

# Install all dependencies (production + dev)
# We use --immutable to ensure lockfile consistency
RUN yarn install --immutable

# Copy source code
COPY . .

# Build the frontend (Vite)
RUN yarn build

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 1337

# Expose port
EXPOSE 1337

# Start the server
CMD ["node", "server.js"]
