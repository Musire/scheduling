import { createSupabaseServerClientReadOnly } from "@/lib/supabase/server"
import { prisma } from "../../../lib/prisma"

// 1. Define roles (source of truth)
export const Roles = ['MANAGER', 'ENDUSER'] as const
export type Role = typeof Roles[number]

// 2. Type guard
function isRole(role: string): role is Role {
  return Roles.includes(role as Role)
}

// 3. Normalize role (safe fallback OR throw)
function normalizeRole(role: string | undefined | null): Role {
  if (!role) return 'ENDUSER' // fallback

  if (!isRole(role)) {
    throw new Error(`Invalid role: ${role}`)
  }

  return role
}

// 4. Main function
export async function getCurrentUserRole(): Promise<Role> {
  const supabase = createSupabaseServerClientReadOnly()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw new Error(error.message)
  if (!user) throw new Error('Not authenticated')

  const dbUser = await prisma.user.findUnique({
    where: { authUserId: user.id },
  })

  if (!dbUser) {
    throw new Error('User not found in DB')
  }

  const rawRole = dbUser.role ?? null

  return normalizeRole(rawRole)
}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClientReadOnly()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
    return null
  }

  if (!user) {
    console.log('supabase', user)
    return null
  }

  const dbUser = await prisma.user.findUnique({
    where: { authUserId: user.id },
  })

  if (!dbUser) {
    console.log('prisma', dbUser)
    return null
  }

  return dbUser

}

export async function getUserById(targetId: string) {
  const user =  await prisma.user.findUnique({
    where: {
      id: targetId
    }
  })

  if (!user) return null

  return user
}