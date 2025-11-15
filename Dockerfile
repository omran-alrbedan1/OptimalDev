# Use an official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
# This caches dependencies and speeds up future builds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Next.js application code
COPY . .

# Expose the default Next.js port
EXPOSE 3000

# Command to run your dev script (which uses turbopack)
CMD ["npm", "run", "dev"]
