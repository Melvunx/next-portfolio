import { prisma } from "@/components/lib/prisma";

export async function updateUserNameAction(user: {
  userId: string;
  name: string;
}) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        name: user.name,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la mise à jour du nom de l'utilisateur");
  }
}
