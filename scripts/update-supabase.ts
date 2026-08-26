import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

async function updateSupabaseMetadata() {
  const email = "manager@example.com";
  
  const { data, error } = await supabaseAdminClient.auth.admin.listUsers();
  if (error) throw error;

  const user = data.users.find((u) => u.email === email);

  if (!user) {
    console.log("User not found in Supabase Auth.");
    return;
  }

  await supabaseAdminClient.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      role: "MANAGER", // Adds/updates the role in user_metadata
    },
  });

  console.log("Successfully updated Supabase Auth user_metadata with role: MANAGER");
}

updateSupabaseMetadata()
  .catch((e) => {
    console.error("Failed to update Supabase metadata:", e);
    process.exit(1);
  });