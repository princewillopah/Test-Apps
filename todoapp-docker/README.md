# A sample todo app in react

- Create a `Dockerfile` in the root directory
- Build the image with `docker build -t my-app-image:v1 .`
- Run a container with `docker run -d -p 80:80 --name my-container my-app-image:v1`
- Access the app on `localhost:80` or `<VM-IP-address>:80` 

```Yaml
# Stage 1: Build the React application
FROM node:18-alpine as installer

# Set working directory to /app
WORKDIR /app

# Copy package*.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:latest as deployer

# Copy the built React application from Stage 1 to /usr/share/nginx/html
COPY --from=installer /app/build/ /usr/share/nginx/html

## Expose port 80 for the Nginx server
EXPOSE 80

## Run the Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]

```
