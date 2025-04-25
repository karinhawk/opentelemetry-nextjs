FROM node:22-slim
WORKDIR /src/app
COPY package.json ./
RUN npm install
COPY . .

ENV OTEL_LOG_LEVEL=debug
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://collector-opentelemetry-collector.default.svc:4318
ENV MONGO_DB_URL=mongodb://mongodb.default.svc:27017/mongodb

EXPOSE 3000
CMD ["npm", "run", "dev"]
