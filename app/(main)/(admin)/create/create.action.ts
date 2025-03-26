import { prisma } from "@/components/lib/prisma";
import { ProjectCreate } from "@/schema/project";

export const createProjectAction = async (project: ProjectCreate) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        projectStatusId: project.statusId,
        githubUrl: project.githubUrl ?? "NULL",
        productionUrl: project.productionUrl ?? "NULL",
        imageUrl: project.imageUrl ?? "NULL",
      },
    });

    return newProject;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la création du projet");
  }
};

export const addTechnologiesAction = async (crendentials: {
  projectId: string;
  technologiesIds: string[];
}) => {
  const { projectId, technologiesIds } = crendentials;

  try {
    const projectTechnos = await Promise.all(
      technologiesIds.map(
        async (techno) =>
          await prisma.projectTechnology.create({
            data: {
              projectId,
              technologyId: techno,
            },
          })
      )
    );

    if (process.env.NODE_ENV === "development") console.log({ projectTechnos });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de l'ajout des technologies au projet");
  }
};
