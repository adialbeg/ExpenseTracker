## Multistage build for the React expense tracker

# Stage 1 – build the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy
COPY package.json .

# Start the application
CMD ["node"]
