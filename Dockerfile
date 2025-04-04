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

ARG DATABASE_URL="postgresql://user:password@host:port/database"

RUN DATABASE_URL=$DATABASE_URL npx prisma generate

RUN npm run build

EXPOSE 80

CMD ["node", "dist/index.js"]