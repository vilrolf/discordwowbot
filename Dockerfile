FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
VOLUME ["/db.json"]
CMD ["node", "app.js"]