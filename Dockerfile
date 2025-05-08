# Use the official Node.js image with version 23.6.1
FROM node:23-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Run Prisma client generation
RUN npx prisma generate

# Build the Next.js application
RUN yarn build

# Set the environment variable for the port
ENV PORT=3020

# Expose port 3020 to the host
EXPOSE 3020

# Start the Next.js app
CMD ["yarn", "start"]
