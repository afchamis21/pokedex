import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient
}

export {}

// check if we are running in production mode
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // check if there is already a connection to the database
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma }
