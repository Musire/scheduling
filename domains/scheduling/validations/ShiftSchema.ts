import z from "zod"

const TimeSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Time must be in HH:mm format."
  )

export const ShiftCreationSchema = z
  .object({
    scheduleId: z.string().min(1, "Schedule is required."),

    areaId: z.string().min(1, "Area is required."),

    roleId: z.string().min(1, "Role is required."),

    userId: z.string().min(1, "User is required."),

    shiftDate: z.coerce.date({
      error: "Shift date is required.",
    }),

    startsAt: TimeSchema,

    endsAt: TimeSchema,
  })
  .superRefine((data, ctx) => {
    const [startHour, startMinute] = data.startsAt
      .split(":")
      .map(Number)

    const [endHour, endMinute] = data.endsAt
      .split(":")
      .map(Number)

    const start = startHour * 60 + startMinute
    const end = endHour * 60 + endMinute

    if (end - start < 59) {
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "Shift must be at least 59 minutes long.",
      })
    }
  })