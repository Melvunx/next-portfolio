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

// Schémas de base
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const TechnologySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: CategorySchema,
});

export const ProjectTechnologySchema = z.object({
  technology: TechnologySchema,
});

export const ReactionSchema = z.object({
  id: z.string(),
  emoji: z.string(),
  action: z.string(),
  tooltip: z.string(),
});

export const ReactionLogSchema = z.object({
  reaction: ReactionSchema,
});

export const ProjectStatusSchema = z.object({
  name: z.string(),
});

export const ProjectCardTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  productionUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  videoUrl: z.string().nullable(),
  status: ProjectStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  technologies: z.array(ProjectTechnologySchema),
  reactions: z.array(ReactionLogSchema),
});

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type ProjectCardType = z.infer<typeof ProjectCardTypeSchema>;
