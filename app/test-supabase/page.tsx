// app/test-supabase/page.tsx

'use client';

import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function TestSupabase() {
  const [result, setResult] = useState<unknown>(null);

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.auth.getClaims();

      setResult({
        success: !error,
        claims: data?.claims ?? null,
        error: error?.message ?? null,
      });
    }

    test();
  }, []);

  return (
    <pre>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}