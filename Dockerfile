# Use ARG for easy version management
ARG NODE_VERSION=20.15.1

# Use a lightweight image to reduce the footprint of the image
FROM node:${NODE_VERSION}-alpine AS build

# Set environment variables
ENV NODE_ENV=production
ENV TOKEN=""

# Set a working directory for your app so the code is separated from the root file system
WORKDIR /app

# Take advantage of Layer Caching and move up in the layers order the actions that are rarely changed
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Use a second stage to create the final image
FROM node:${NODE_VERSION}-alpine

# Set environment variables
ENV NODE_ENV=production
ENV TOKEN=""
ENV HOME=/home/customuser

# Create app directory and set working directory
WORKDIR /app

# Install necessary packages and add non-root user
RUN apk add --no-cache shadow && \
    addgroup -S customgroup && adduser -S customuser -G customgroup && \
    chown -R customuser:customgroup /app

# Change to non-root user
USER customuser

# Copy built application from build stage
COPY --from=build /app .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]