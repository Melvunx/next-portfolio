import { z } from "better-auth";

export const ProjectCreateSchema = z.object({
  title: z.string().min(3, "Minimum 3 charactères !"),
  description: z.string().min(10, "Minimum 10 charactères !"),
  githubUrl: z.string().url().optional(),
  productionUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  statusId: z.string().cuid(),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
