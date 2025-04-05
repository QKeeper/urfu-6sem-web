# FIXME: Не билдится ни фронт, ни бэк

FROM node:18-alpine AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server ./

RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/index.js"]