import z from "zod";


export const WeekCreationSchema = z.object({
    week: z.string().min(1, 'a week value must be provided')
})

export type WeekCreationType = z.infer<typeof WeekCreationSchema>