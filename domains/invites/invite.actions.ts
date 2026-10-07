'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createRegAction, createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction"
import { createPasswordService, inviteStaffService, reinviteStaffService, revokeInviteService, validateEmailService } from "./invite.services"
import { EmailValildationSchema, InviteCreationSchema, InviteCreationType, InviteUpdateSchema, InviteUpdateType, PasswordCreationSchema } from "./invite.validation"

export const inviteStaff = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: InviteCreationType) => {
        const validated = validateSchema(InviteCreationSchema , input)
        const res = inviteStaffService(validated)
        revalidatePath('/manage/users')
        return res
    }
)

export const reinviteStaff = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: InviteUpdateType) => {
        const validated = validateSchema(InviteUpdateSchema, input)
        const res = reinviteStaffService(validated)
        revalidatePath('/manage/users')
        return res
    }
)

export const revokeInvite = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: InviteUpdateType) => {
        const validated = validateSchema(InviteUpdateSchema , input)
        const res = revokeInviteService(validated)
        revalidatePath('/manage/users')
        return res
    }
)

export const validateEmail = createRegAction(
    async (_: any, formData: FormData) => {
        const validated = validateFormData(EmailValildationSchema, formData);
        const invitation = await validateEmailService(validated)

        if (!invitation) {
            return { success: false, error: "No invitation found for this email" };
        }

        // The Controller handles the redirects directly on the server
        if (invitation.status === "REVOKED" || invitation.status === "EXPIRED") {
            redirect("/invitation-invalid"); 
        }

        if (invitation.status === "PENDING") {
            redirect(`/invite/accept/${invitation.id}`);
        }
    }
);

export const createPassword = createRegAction(
    async (_:any, formData: FormData) => {
        const validated = validateFormData(PasswordCreationSchema, formData)
        const res = await createPasswordService(validated)
        if (res) {
            redirect('/login')
        }
    }
)
