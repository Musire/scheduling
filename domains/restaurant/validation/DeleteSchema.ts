import z from "zod";

export const DeleteAreaSchema = z.object({
  ids: z.array(z.string()).min(1)
});

export type DeleteAreaType = z.infer<typeof DeleteAreaSchema>;
