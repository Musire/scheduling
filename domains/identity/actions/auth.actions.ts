'use server'; 

import { prisma } from "@/lib/prisma";
import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient, createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { safeAction } from "../auth/safeAction";

export async function logout() {

  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  // Clear session and send user somewhere safe
  redirect("/login")
}




export type FormState = { success: boolean, error: string | null }


export async function login(
  _: FormState, 
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'missing credentials'}
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message}
  }

  return { success: true, error: null}

}


export async function inviteAdmin(email: string) {
  
  // 1️⃣ Invite the user (creates auth user + sends invite email)
  const { data: inviteData, error: inviteError } =
    await supabaseAdminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/welcome`,
      data: {
        role: 'admin',
      },
    });

  if (inviteError) throw new Error(inviteError.message);
  if (!inviteData.user) throw new Error('No user returned');

  return { user: inviteData.user };

}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClientReadOnly()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    if (error.name === 'AuthSessionMissingError') {
      return null
    }
    throw new Error(error.message)
  }
  
  return user
}

export async function hasStaffProfile() {
    return safeAction( async () => {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('not signed in')
      }
      const exists = await prisma.staffProfile.findUnique({
        where: { userId: user.id },
        select: { id: true },
      })

      return Boolean(exists)
    })
}

export async function signup(
  _: FormState, 
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as string

  if (!email || !password || !role) {
    return { success: false, error: 'missing credentials'}
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
      data: {
        role,
        full_name: fullName
      },
    },
  })

  if (error) {
    return { success: false, error: error.message}
  }

  return { success: true, error: null}

}