'use server'; 

import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient, createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthRepository } from "../auth.repositories";
import { loginSchema } from "../auth.validations";
import { createRegAction, validateFormData } from "../auth/safeAction";

export type FormState = { success: boolean, error: string | null }

export async function logout() {

  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  // Clear session and send user somewhere safe
  redirect("/login")
}

export const login = createRegAction(
  async(_: FormState, formData: FormData) => {
    const validated = validateFormData(loginSchema, formData)

    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return
    
  }
)


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

export async function getPrismaUserId () {
  const user = await getCurrentUser()
  return AuthRepository.getUserPrismaId(user?.id ?? '')
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