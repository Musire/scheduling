'use server'

import { redirect } from "next/navigation"
import { createRegAction, createSafeAction, validateFormData, validateSchema } from "../identity/auth/safeAction"
import { createPasswordService, inviteStaffService, validateEmailService } from "./invite.services"
import { EmailValildationSchema, InviteCreationSchema, InviteCreationType, PasswordCreationSchema } from "./invite.validation"

export const inviteStaff = createSafeAction(
    {
        allowedRoles: ['MANAGER']
    },
    async (input: InviteCreationType) => {
        const validated = validateSchema(InviteCreationSchema , input)
        const res = inviteStaffService(validated)
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
