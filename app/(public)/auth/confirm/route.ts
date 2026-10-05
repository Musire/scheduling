import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const invitationId = searchParams.get("id");
  const code = searchParams.get("code"); // Appended by Supabase PKCE
  const tokenHash = searchParams.get("token_hash"); // Appended by Supabase Implicit/OTP
  const type = searchParams.get("type") as EmailOtpType | null;

  if (!invitationId) {
    return NextResponse.redirect(new URL("/invite/error?reason=invalid", origin));
  }

  // 1. Prisma Check: Ensure invitation exists and is valid
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: { id: true, email: true, status: true, expiresAt: true },
  });

  if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt <= new Date()) {
    return NextResponse.redirect(new URL("/invite/error?reason=invalid", origin));
  }

  // 2. Supabase Check: Authenticate user & establish session
  const supabase = await createSupabaseServerClient();
  let authUser = null;

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) authUser = data.user;
  } else if (tokenHash && type === "invite") {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "invite",
    });
    if (!error) authUser = data.user;
  }

  // If Supabase authentication fails, reject
  if (!authUser) {
    return NextResponse.redirect(new URL("/invite/error?reason=unauthorized", origin));
  }

  // 3. Security Cross-Check: Ensure authenticated user matches Prisma invite email
  if (authUser.email?.toLowerCase() !== invitation.email.toLowerCase()) {
    return NextResponse.redirect(new URL("/invite/error?reason=mismatch", origin));
  }

  // Everything valid -> Proceed to password setup / acceptance page
  return NextResponse.redirect(new URL(`/invite/accept?id=${invitation.id}`, origin));
}