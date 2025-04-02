# Stage 1: Build the Nuxt app
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Nuxt app
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory.
COPY --from=build /app/.output ./

# Copy package.json to install only production dependencies
COPY package*.json ./

# install only production dependencies.
RUN npm install --production

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production

# Expose the port Nuxt app runs on
EXPOSE 3000

# Start the Nuxt app
CMD ["node","/app/server/index.mjs"]