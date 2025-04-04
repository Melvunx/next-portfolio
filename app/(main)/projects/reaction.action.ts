import { prisma } from "@/components/lib/prisma";

export const getReactionsAction = async () => {
  try {
    const reactions = await prisma.reaction.findMany();

    return reactions;
  } catch (error) {
    console.error("Erreur lors de la récupération des réactions:", error);
    throw new Error("Impossible de récupérer les réactions");
  }
};
