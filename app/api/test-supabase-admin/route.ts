// app/api/test-supabase-admin/route.ts

import { supabaseAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } =
    await supabaseAdminClient.auth.admin.listUsers();

  return NextResponse.json({
    success: !error,
    userCount: data?.users?.length ?? null,
    error: error?.message ?? null,
  });
}