import { isHourAfter } from "@/lib/timeUtils";
import z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Area name is required"),
});

export const RequirementCreateSchema = z.object({
  areaId: z.string().min(1, 'need to specify work area'),
  roleId: z.string().min(1, 'need to specify area role'),
  dayofWeek: z.number().min(1, 'please select weekday'),
  startAt: z.string().min(1, 'start time needed'),
  endsAt: z.string().min(1, 'end time needed'),
  requiredUsers: z.number().int().min(1, 'must require at least 1 user'),
})
.refine(
    (data) => isHourAfter(data.startAt, data.endsAt), 
    {
      message: 'End time must be at least 60 minutes after start time',
      path: ['endsAt'], // Pins the validation message to the endsAt input field
    }
);

export const RequirementUpdateSchema = z.object({
  id: z.uuid().min(1, 'missing the necessary credentials'),
  name: z.string().min(1, "Area name is required"),
});


export type CreateRequirementType = z.infer<typeof RequirementCreateSchema>;
export type UpdateRequirementType = z.infer<typeof RequirementUpdateSchema>;

