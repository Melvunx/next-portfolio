import { z } from "better-auth";

export const LetterCreateSchema = z.object({
  sender: z.string().min(3).max(30),
  email: z.string().email().max(50),
  object: z.string().min(3).max(50),
  message: z.string().min(10).max(500),
  accountId: z.string().optional(),
});

export type LetterCreate = z.infer<typeof LetterCreateSchema>;
