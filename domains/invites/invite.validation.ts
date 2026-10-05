import z from "zod";

export const InviteCreationSchema = z.object({
    id: z.uuid(),
    email: z.string().min(1, ''),
})

export const EmailValildationSchema = z.object({
    email: z.email()
})

export const PasswordCreationSchema = z
.object({
    password: z.string().min(1, 'password is needed'),
    password2: z.string().min(1, 'password confirmation is needed'),
    invitationId: z.string().min(1, 'invitation id is needed')
})
.refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"], 
  });

export type InviteCreationType = z.infer<typeof InviteCreationSchema>
export type EmailValildationType = z.infer<typeof EmailValildationSchema>
export type PasswordCreationType = z.infer<typeof PasswordCreationSchema>