FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM nginx:1.25-alpine

WORKDIR /usr/src/app

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/app/dist /usr/src/app/dist

EXPOSE 80
