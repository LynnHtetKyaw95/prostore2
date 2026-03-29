import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

async function main() {
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database seeded successfully");

  console.log(process.env.DATABASE_URL);
}

main();
