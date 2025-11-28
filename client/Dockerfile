#NEW BUILD APPROACH USING NGINX
#FROM node:16-alpine AS builder
FROM node:alpine AS builder
# ENV NODE_ENV production
# Add a work directory 
WORKDIR /app
# Cache and Install dependencies 
COPY package.json package-lock.json* ./
# Install app dependencues
RUN npm install --production=false
# copy all app files to current /app directory
COPY . .
# Build the app 
RUN npm run build

# Bundler static assests with nginx
#FROM nginx:1.21.0-alpine as production
FROM nginx:latest AS production
# ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose nginx
EXPOSE 80
#Start nginx
CMD ["nginx", "-g", "daemon off;"]