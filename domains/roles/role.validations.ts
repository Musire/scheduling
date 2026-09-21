import z from "zod";

export const RoleCreateSchema = z.object({
  name: z.string().min(1, "role name is required"),
  areaSlug: z.string().min(1, "Area credential missing")
});

export type RoleCreateType = z.infer<typeof RoleCreateSchema>;
