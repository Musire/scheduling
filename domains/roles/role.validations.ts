import z from "zod";

export const RoleCreateSchema = z.object({
  name: z.string().min(1, "role name missing"),
  areaId: z.string().min(1, "Area id missing")
});

export const RoleUpdateSchema = z.object({
  id: z.string().min(1, 'original id is needed for update'),
  name: z.string().min(1, "role name is required"),
});

export const DeleteRoleSchema = z.object({
  id: z.string().min(1, 'id is missing')
});

export type RoleCreateType = z.infer<typeof RoleCreateSchema>;
export type RoleUpdateType = z.infer<typeof RoleUpdateSchema>;
export type DeleteRoleType = z.infer<typeof DeleteRoleSchema>;
