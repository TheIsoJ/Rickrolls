FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add jq curl bash

COPY package.json .
COPY package-lock.json .

RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest

RUN npm ci

ENV TZ=Europe/Helsinki
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start:migrate:dev:docker" ]