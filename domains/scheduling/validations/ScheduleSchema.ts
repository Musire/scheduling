import z from "zod";


export const ScheduleCreationSchema = z.object({
    weekStart: z.string().min(1, 'a week value must be provided')
})

export type ScheduleCreationType = z.infer<typeof ScheduleCreationSchema>