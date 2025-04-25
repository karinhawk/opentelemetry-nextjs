import { MongoClient } from 'mongodb'

const url = process.env.MONGO_DB_URL ?? 'mongodb://localhost:27017/mongodb'
const options = {}

let client: MongoClient

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(url, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(url, options)
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client
