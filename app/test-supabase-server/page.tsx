// app/test-supabase-server/page.tsx

import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function TestSupabaseServer() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.getClaims();

  return (
    <pre>
      {JSON.stringify(
        {
          success: !error,
          claims: data?.claims ?? null,
          error: error?.message ?? null,
        },
        null,
        2
      )}
    </pre>
  );
}