import { isHourAfter } from "@/lib/timeUtils";
import z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Area name is required"),
});

export const RequirementCreateSchema = z.object({
  areaId: z.string().min(1, 'need to specify work area'),
  roleId: z.string().min(1, 'need to specify area role'),
  dayOfWeek: z.coerce.number().min(1, 'please select weekday'),
  // Changed from z.string() to coerced numbers
  startsAt: z.coerce.number().min(1, 'start time needed'),
  endsAt: z.coerce.number().min(1, 'end time needed'),
  requiredUsers: z.coerce.number().int().min(1, 'must require at least 1 user'),
})
.refine(
  // 3600 seconds = 60 minutes
  (data) => data.endsAt - data.startsAt >= 3600, 
  {
    message: 'End time must be at least 60 minutes after start time',
    path: ['endsAt'], // Pins the validation message to the endsAt input field
  }
);

export const RequirementUpdateSchema = z.object({
  id: z.uuid().min(1, 'missing the identifier'),
  areaId: z.string().min(1, 'need to specify work area'),
  roleId: z.string().min(1, 'need to specify area role'),
  dayOfWeek: z.coerce.number().min(1, 'please select weekday'),
  startsAt: z.string().min(1, 'start time needed'),
  endsAt: z.string().min(1, 'end time needed'),
  requiredUsers: z.coerce.number().int().min(1, 'must require at least 1 user'),
})
.refine(
    (data) => isHourAfter(data.startsAt, data.endsAt), 
    {
      message: 'End time must be at least 60 minutes after start time',
      path: ['endsAt'], // Pins the validation message to the endsAt input field
    }
);

export const DeleteRequirementSchema = z.object({
  id: z.string().min(1, 'required id')
})



export type CreateRequirementType = z.infer<typeof RequirementCreateSchema>;
export type UpdateRequirementType = z.infer<typeof RequirementUpdateSchema>;
export type DeleteRequirmentType = z.infer<typeof DeleteRequirementSchema>;