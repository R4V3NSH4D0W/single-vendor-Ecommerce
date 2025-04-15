// prisma/seed-categories.ts
import { PrismaClient } from '../src/generated/prisma'; // Adjust if needed
import cuid from 'cuid';

const prisma = new PrismaClient();

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "books", label: "Books" },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { value: category.value },
      update: {},
      create: {
        id: cuid(), // ✅ using cuid here
        label: category.label,
        value: category.value,
      },
    });
  }

  console.log("✅ Categories inserted successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error inserting categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
