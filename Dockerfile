FROM node:20.5-alpine3.17

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

# Bundle app source
COPY . /usr/src/app

# Install dependencies
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose port 3000
EXPOSE 4000

# Run the app
CMD [ "npm", "start" ]