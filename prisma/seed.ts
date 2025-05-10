import { PrismaClient } from '@prisma/client'
import path from 'path'

const prisma = new PrismaClient()

async function main() {

  const testimonialSeed = require(path.resolve(__dirname, '../seed-testmonial.ts'))


  await testimonialSeed(prisma)

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
