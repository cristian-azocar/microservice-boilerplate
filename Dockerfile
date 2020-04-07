FROM node:12.16.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon", "src/index.ts"]
