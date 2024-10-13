# Base image
<<<<<<< HEAD
FROM node:16-alpine

# Create app directory
WORKDIR /hoidanit/backend-nest
=======
FROM node:16

# Install build dependencies
RUN apt-get update && apt-get install -y make gcc g++ python3 && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /nestjs-basic
>>>>>>> 65cb50331c5ce6512690d86afe82ae81ad091fd6

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

RUN npm i -g @nestjs/cli@10.0.3

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
<<<<<<< HEAD
CMD [ "node", "dist/main.js" ]
=======
CMD [ "node", "dist/main.js" ]
>>>>>>> 65cb50331c5ce6512690d86afe82ae81ad091fd6
