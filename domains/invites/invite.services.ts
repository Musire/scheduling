import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { supabaseAdminClient } from "@/lib/supabase/admin";
import { addHours } from "date-fns";
import { getPrismaUserId } from "../identity/actions/auth.actions";
import { InviteRepositories } from "./invite.repositories";
import { EmailValildationType, InviteCreationType, PasswordCreationType } from "./invite.validation";

export async function inviteStaffService(data: InviteCreationType) {

  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const userId = await getPrismaUserId()
  if (!userId) {
    throw new Error('no user id found')
  }

  const createdAtNative = new Date(); 
  const expiresAt = addHours(createdAtNative, 72)
  
  const invitationData = {
      email: data.email,
      userId: data.id,
      expiresAt: expiresAt,
      invitedById: userId
  }
  return InviteRepositories.createInvitation(invitationData)
  
}

export async function validateEmailService(data: EmailValildationType) {
  const invitation = await InviteRepositories.getInvite(data.email);
  if (!invitation) return null;

  const isExpired = new Date() > new Date(invitation.expiresAt);
  if (invitation.status === "PENDING" && isExpired) {
    const updated = await InviteRepositories.expireInvitation(invitation.id);
    return updated;
  }

  return invitation;
}

export async function createPasswordService (data: PasswordCreationType) {
  let createdAuthUserId: string | null = null;

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      
      const invitation = await tx.invitation.findUnique({
        where: { id: data.invitationId },
        include: { user: true }, 
      });

      if (!invitation) {
        throw new Error("Invitation not found.");
      }
      if (invitation.status === 'ACCEPTED') {
        throw new Error("Invitation has already been accepted.");
      }
      if (!invitation.user) {
        throw new Error("No user is linked to this invitation.");
      }

      const { data: authData, error: authError } = await supabaseAdminClient.auth.admin.createUser({ 
        email: invitation.user.email, 
        password: data.password, 
        email_confirm: true, 
        user_metadata: {
          id: invitation.user.id,
          name: invitation.user.name,
          role: invitation.user.role
        },
        app_metadata: {
          display_name: invitation.user.name,
        }
      });

      if (authError || !authData.user) {
        throw new Error(`Supabase Auth creation failed: ${authError?.message}`);
      }

      createdAuthUserId = authData.user.id;

      const updatedInvitation = await tx.invitation.update({
        where: { id: data.invitationId },
        data: { status: 'ACCEPTED' },
      });

      const updatedUser = await tx.user.update({
        where: { id: invitation.userId },
        data: { authUserId: createdAuthUserId, status: 'ACTIVE' },
      });

      return updatedUser.id
    });

    return result;

  } catch (error) {
    if (createdAuthUserId) {
      await supabaseAdminClient.auth.admin.deleteUser(createdAuthUserId);
    }
    
    throw error;
  }
}