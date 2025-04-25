import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb'
import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({
    serviceName: 'web-app',
    instrumentations: [new MongoDBInstrumentation()],
  })
}
