import { PrismaClient } from '../src/generated/prisma'; 
import cuid from 'cuid';

const prisma = new PrismaClient();

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "books", label: "Books" },
  { value: "footwear", label: "Footwear" },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { value: category.value },
      update: {},
      create: {
        id: cuid(),
        label: category.label,
        value: category.value,
      },
    });
  }

}

main()
  .catch((e) => {
    console.error("❌ Error inserting categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
