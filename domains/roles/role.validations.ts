import z from "zod";

export const RoleCreateSchema = z.object({
  name: z.string().min(1, "role name is required"),
  areaSlug: z.string().min(1, "Area credential missing")
});

export const DeleteRoleSchema = z.object({
  areaSlug: z.string().min(1, 'areaSlug is needed'),
  id: z.string().min(1, 'id is missing')
});

export type RoleCreateType = z.infer<typeof RoleCreateSchema>;
export type DeleteRoleType = z.infer<typeof DeleteRoleSchema>;
