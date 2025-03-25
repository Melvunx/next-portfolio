import { prisma } from "@/components/lib/prisma";
import { redirect } from "next/navigation";

export async function DeleteUserAction(userId: string) {
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
