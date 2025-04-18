FROM node:23-alpine AS builder-client

WORKDIR /app/client

COPY client/package.json client/package-lock.json* ./

RUN npm ci

COPY client/ ./

RUN npm run build

WORKDIR /app/server

COPY server/package.json server/package-lock.json* ./

RUN npm ci

COPY server/ ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]