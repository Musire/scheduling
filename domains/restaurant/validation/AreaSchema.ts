import z from "zod";

export const AreaCreateSchema = z.object({
  name: z.string().min(1, "Area name is required"),
});

export const AreaUpdateSchema = z.object({
  id: z.uuid().min(1, 'missing the necessary credentials'),
  name: z.string().min(1, "Area name is required"),
});

export const AreaSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Area name is required"),
  active: z.boolean().optional(), 
  
  roles: z.any().optional(),
  userAreaRoles: z.any().optional(),
  shifts: z.any().optional(),
  coverageRequirements: z.any().optional(),
});


export type AreaType = z.infer<typeof AreaSchema>;
export type CreateAreaType = z.infer<typeof AreaCreateSchema>;
export type UpdateAreaType = z.infer<typeof AreaUpdateSchema>;

