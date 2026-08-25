'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient( url, key,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        async setAll(cookiesToSet) {
          cookiesToSet.forEach(async ({ name, value, options }) => {
            (await cookieStore).set({ name, value, ...options });
          });
        },
      },
    }
  );
}

export function createSupabaseServerClientReadOnly() {
  const cookieStore = cookies();

  return createServerClient( url, key,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        async setAll(cookiesToSet) {
          return
        }
      },
    }
  );
}
