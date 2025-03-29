import { z } from "better-auth";

export const CathegoriesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    technologies: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  })
);

export type Categories = z.infer<typeof CathegoriesSchema>;
