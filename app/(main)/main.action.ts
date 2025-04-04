import { prisma } from "@/components/lib/prisma";
import { LetterCreate, LetterCreateSchema } from "@/schema/letter";
import { redirect } from "next/navigation";

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

export async function deleteUserAction(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }

  redirect("/");
}
