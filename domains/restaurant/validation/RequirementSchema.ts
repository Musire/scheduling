import z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Area name is required"),
});

export const RequirementCreateSchema = z.object({
  areaId: z.string(),
  roleId: z.string(),
  dayofWeek: z.number(),
  startAt: z.string().min(1, 'start time needed'),
  endsAt: z.string().min(1, 'end time needed'),
  requiredUsers: z.number().int(),
});

export const RequirementUpdateSchema = z.object({
  id: z.uuid().min(1, 'missing the necessary credentials'),
  name: z.string().min(1, "Area name is required"),
});


export type CreateRequirementType = z.infer<typeof RequirementCreateSchema>;
export type UpdateRequirementType = z.infer<typeof RequirementUpdateSchema>;

