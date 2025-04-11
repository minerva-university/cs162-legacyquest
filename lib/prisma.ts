import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import ws from 'ws' // Import 'ws' for Node.js WebSocket support with Neon serverless driver

// Declare a global variable to hold the PrismaClient instance.
// This ensures that only one instance is created, especially during development
// with hot-reloading, preventing connection pool exhaustion.
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create a Neon serverless connection pool.
// DATABASE_URL is fetched from the .env file.
// WebSocket implementation is provided for the driver.
const neon = new Pool({ connectionString: process.env.DATABASE_URL, WebSocket: ws })

// Instantiate the Prisma Neon adapter with the connection pool.
const adapter = new PrismaNeon(neon)

// Instantiate the Prisma Client.
// If a global instance already exists (in non-production environments),
// use that instance. Otherwise, create a new instance with the Neon adapter.
export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter, // Use the configured Neon adapter
    // Optional: Configure logging. 'query' logs SQL queries executed by Prisma.
    log: ['query', 'info', 'warn', 'error'], 
  })

// In development, assign the created Prisma Client instance to the global variable.
// This prevents creating new instances on hot reloads.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
} 