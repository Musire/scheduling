import z from "zod";


export const WeekCreationSchema = z.object({
    week: z.string().min(1, 'a week value must be provided')
})

export const WeekPublishSchema = z.object({
    id: z.uuid().min(1, 'resource id needed')
})

export type WeekCreationType = z.infer<typeof WeekCreationSchema>
export type WeekPublishType = z.infer<typeof WeekPublishSchema>