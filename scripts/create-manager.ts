import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

console.log(
  "Prisma host:",
  new URL(connectionString).hostname
);

console.log(
  "Prisma port:",
  new URL(connectionString).port
);

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

const email = "manager@example.com";
const password = "ChangeThisPassword123!";
const name = "First Manager";

async function main() {
  console.log(`Creating manager: ${email}`);

  // --------------------------------------------------
  // 1. Check whether the application user already exists
  // --------------------------------------------------

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    console.log("Application user already exists.");

    console.log({
      id: existingUser.id,
      authUserId: existingUser.authUserId,
      email: existingUser.email,
      role: existingUser.role,
      status: existingUser.status,
    });

    return;
  }

  // --------------------------------------------------
  // 2. Create the Supabase Auth user
  // --------------------------------------------------

  const { data, error } =
    await supabaseAdminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
      },
    });

  if (error) {
    throw new Error(
      `Supabase Auth error: ${error.message}`
    );
  }

  if (!data.user) {
    throw new Error(
      "Supabase did not return the created user."
    );
  }

  const authUser = data.user;

  console.log(
    `Supabase Auth user created: ${authUser.id}`
  );

  // --------------------------------------------------
  // 3. Create the application User
  // --------------------------------------------------

  try {
    const user = await prisma.user.create({
      data: {
        authUserId: authUser.id,
        email,
        name,
        role: "MANAGER",
        status: "ACTIVE",
        avatarUrl: ''
      },
    });

    console.log("");
    console.log("=================================");
    console.log("Manager created successfully");
    console.log("=================================");
    console.log("");
    console.log(`Name:       ${user.name}`);
    console.log(`Email:      ${user.email}`);
    console.log(`Role:       ${user.role}`);
    console.log(`Status:     ${user.status}`);
    console.log(`User ID:    ${user.id}`);
    console.log(`Auth ID:    ${user.authUserId}`);
    console.log("");
  } catch (error) {
    // --------------------------------------------------
    // Roll back the Supabase Auth user if Prisma fails.
    // --------------------------------------------------

    console.error(
      "Prisma user creation failed."
    );

    console.error(
      "Removing the Supabase Auth user..."
    );

    await supabaseAdminClient.auth.admin.deleteUser(
      authUser.id
    );

    throw error;
  }
}

main()
  .catch((error) => {
    console.error("");
    console.error("Failed to create manager.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });