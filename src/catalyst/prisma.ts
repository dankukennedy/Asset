import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
})

export default prisma

// Optional: Add a function to properly disconnect Prisma
export async function disconnectPrisma() {
  await prisma.$disconnect()
}