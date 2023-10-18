# Build the client
FROM node:18-bullseye-slim as client

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm ci

COPY ./client .

RUN npm run build

# Server
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm ci

COPY ./server .
COPY --from=client /usr/src/app/dist /usr/src/app/client

EXPOSE 80
CMD [ "npm", "start" ]