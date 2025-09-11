FROM node:21-alpine

WORKDIR /usr/src/app

COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
RUN npm install -g nodemon
CMD ["nodemon", "index.js"]
