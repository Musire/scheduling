import z from "zod";


export const ShiftCreationSchema = z.object({
    scheduleId: z.string().min(1, ''),
    areaId: z.string().min(1, ''),
    roleId: z.string().min(1, ''),
    userId: z.string().min(1, ''),
    shiftDate: z.string().min(1, ''),
    startsAt: z.string().min(1, ''),
    endsAt: z.string().min(1, ''),
})

export type ShiftCreationType = z.infer<typeof ShiftCreationSchema>