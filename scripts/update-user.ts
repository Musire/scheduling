import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function updateEndUserRole() {
  const email = "luffy@strawhat.com";

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { role: "END_USER" },
  });

  console.log(
    `Successfully updated user ${updatedUser.email} to role: ${updatedUser.role}`
  );
}

updateEndUserRole()
  .catch((e) => {
    console.error("Failed to update role:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });