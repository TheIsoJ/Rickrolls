FROM node:lts AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm i

COPY . .

FROM node:lts

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

CMD [ "npm", "run", "start:migrate:prod" ]