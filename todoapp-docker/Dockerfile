 # Stage 1: Build the React application
FROM node:18

# Set working directory to /app
WORKDIR /princewill

 # Copy package*.json to /app
#  COPY package*.json ./
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Expose desired port (assuming you're previewing via vite preview)
EXPOSE 3000

# Start preview server for built app
CMD ["npm", "start"]