import z from "zod";


export const UserCreationSchema = z.object({
    email: z.email().min(1, ''),
    name: z.string().min(1, ''),
    payRate: z.coerce.number().min(1, '')
})

export const UserUpdateSchema = z.object({
    id: z.uuid(),
    email: z.email().min(1, ''),
    name: z.string().min(1, ''),
    payRate: z.coerce.number().min(1, '')
})

export type UserCreationType = z.infer<typeof UserCreationSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
