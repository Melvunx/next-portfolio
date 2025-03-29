import { prisma } from "@/components/lib/prisma";

export async function getProjectStatus() {
  const status = await prisma.projectStatus.findMany();

  return status;
}

export async function getTechnologies() {
  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return technologies;
}

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      technologies: {
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return categories;
}
