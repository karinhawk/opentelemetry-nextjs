FROM node:22-alpine AS builder

WORKDIR /app

COPY src .
COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build

COPY . .

EXPOSE 3001

USER 123

CMD ["node", "dist/index.js"]
