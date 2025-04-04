import { prisma } from "@/components/lib/prisma";
import { LetterCreate, LetterCreateSchema } from "@/schema/letter";
import { z } from "better-auth";
import { redirect } from "next/navigation";

export const idValidateSchema = z.string().uuid().nonempty();

export async function sendLetterAction(credentials: LetterCreate) {
  try {
    const letter = LetterCreateSchema.parse(credentials);

    const { sender, email, object, message, accountId } = letter;

    await prisma.letter.create({
      data: {
        sender,
        email,
        object,
        message,
        accountId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'envoi du message");
  }

  redirect("/");
}

export async function getAccountIdAction(userId: string) {
  try {
    const validateUserId = idValidateSchema.parse(userId);

    const accountId = await prisma.account.findFirst({
      where: {
        userId: validateUserId,
      },
      select: {
        id: true,
      },
    });

    if (!accountId) return null;

    return accountId.id;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de l'ID du compte");
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const validateUserId = idValidateSchema.parse(userId);

    await prisma.user.delete({
      where: {
        id: validateUserId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }

  redirect("/");
}
