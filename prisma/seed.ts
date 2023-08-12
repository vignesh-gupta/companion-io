const { PrismaClient } = require('@prisma/client' )

const prisma = new PrismaClient()

async function main() {
  let res = await prisma.category.createMany({
    data: [
      { name: 'Famous People' },
      { name: 'Movies & TV' },
      { name: 'Sports' },
      { name: 'Technology' },
      { name: 'Games' },
      { name: 'Philosophy' },
      { name: 'Scientist' },
    ]
  })

  console.info(res);
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })