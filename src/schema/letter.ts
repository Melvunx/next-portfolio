import { z } from "better-auth";

export const LetterCreateSchema = z.object({
  sender: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  object: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  accountId: z.string().optional(),
});

export type LetterCreate = z.infer<typeof LetterCreateSchema>;
