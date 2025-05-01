import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      duration: "3-5 business days",
      cost: 10.0,
    },
    {
      name: "Express Shipping",
      duration: "1-2 business days",
      cost: 18.0,
    },
    {
      name: "Overnight Shipping",
      duration: "Next business day",
      cost: 25.0,
    },
  ];

  console.log('Starting seeding process...');

  for (const shippingMethod of shippingMethods) {
    try {
      const result = await prisma.shippingMethod.create({
        data: shippingMethod,
      });
      console.log(`Shipping method "${shippingMethod.name}" created successfully with ID: ${result.id}`);
    } catch (error) {
      console.error('Error creating shipping method:', error);
    }
  }

  console.log("Shipping methods seeded successfully!");
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
