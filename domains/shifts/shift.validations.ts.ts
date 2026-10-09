import z from "zod";

/**
 * Strict regex for matching absolute UTC ISO-8601 timestamps 
 * Example: 2026-09-20T20:46:22.000Z
 */
const UtcIsoStringSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "Timestamp must be a valid UTC ISO string (YYYY-MM-DDTHH:mm:ss.sssZ)."
  );

/* =========================================================
             0. Base Fields Schema
   ========================================================= */
const BaseShiftSchema = z.object({
  scheduleId: z.string().min(1, "Schedule is required."),
  areaId: z.string().min(1, "Area is required."),
  roleId: z.string().min(1, "Role is required."),
  userId: z.string().min(1, "User is required."),
});

/* =========================================================
             1. Frontend / Service Validation Schema
   ========================================================= */
export const ShiftCreationSchema = BaseShiftSchema.extend({
  shiftDate: z.coerce.date({
    error: "Shift date is required.",
  }),
  // Both fields coerced to numbers tracking total seconds
  startsAt: z.coerce.number(),
  endsAt: z.coerce.number(),
}).superRefine((data, ctx) => {
  // 59 minutes * 60 seconds = 3540 seconds
  if (data.endsAt - data.startsAt < 3540) {
    ctx.addIssue({
      code: "custom",
      path: ["endsAt"],
      message: "Shift must be at least 59 minutes long.",
    });
  }
});

export type ShiftCreationType = z.infer<typeof ShiftCreationSchema>;


/* =========================================================
             2. Repository / Database Schema
   ========================================================= */
export const ShiftDbSchema = BaseShiftSchema.extend({
  shiftDate: z.instanceof(Date),
  startsAt: z.coerce.number(),
  endsAt: z.coerce.number(),
});

export type ShiftDbType = z.infer<typeof ShiftDbSchema>;
