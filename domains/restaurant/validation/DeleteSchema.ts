import z from "zod";

export const DeleteAreaSchema = z.object({
  id: z.string().min(1, 'area id is needed')
});

export const DeleteRoleSchema = z.object({
  areaSlug: z.string().min(1, ''),
  ids: z.array(z.string()).min(1)
});



export type DeleteAreaType = z.infer<typeof DeleteAreaSchema>;
export type DeleteRoleType = z.infer<typeof DeleteRoleSchema>;

