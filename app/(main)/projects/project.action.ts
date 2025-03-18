import { prisma } from "@lib/prisma";

export const getProjectsAction = async () => {
  try {
    const projects = await prisma.project.findMany({
      omit: {
        projectStatusId: true,
      },
      include: {
        status: {
          select: {
            name: true,
          },
        },
        technologies: {
          omit: {
            technologyId: true,
            projectId: true,
          },
          include: {
            technology: {
              omit: { categoryId: true },
              include: {
                category: true,
              },
            },
          },
        },
        reactions: {
          include: {
            reaction: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    throw new Error("Impossible de récupérer les projets");
  }
};

export const createProjectAction = async () => {};

export const deleteProjectAction = async (projectId: string) => {
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return {
      message: "Le projet a été supprimé avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    throw new Error("Impossible de supprimer le projet");
  }
};
