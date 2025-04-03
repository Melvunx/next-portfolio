import { ProjectCardType } from "@/schema/project";
import { getProjectsAction } from "@app/(main)/projects/project.action";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export async function ProjectCard({ project }: { project: ProjectCardType }) {
  
  if (!project) {
    return <div>Erreur lors de la récupération du projet</div>;
  }

  if (project.imageUrl === null) project.imageUrl = "NULL";
  if (project.githubUrl === null) project.githubUrl = "NULL";
  if (project.productionUrl === null) project.productionUrl = "NULL";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {project.imageUrl !== "NULL" && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={300}
            height={200}
            className="object-cover w-full h-48 rounded-lg"
          />
        )}
        <div>
          {project.githubUrl !== "NULL" && (
            <Link href={project.githubUrl}>
              <Button variant="outline" className="mr-2 italic">
                Github du projet !
              </Button>
            </Link>
          )}
          {project.productionUrl !== "NULL" && (
            <Link href={project.productionUrl}>
              <Button variant="outline" className="mr-2 italic">
                Voir le projet !
              </Button>
            </Link>
          )}
        </div>
        <p>{project.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/projects/${project.id}`}>
          <Button>En savoir plus...</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export function ProjectPagination({ length }: { length: number }) {
  return <div>Enter {length}</div>;
}

export function TechnologyFilter({ technology }: { technology: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {technology}
    </div>
  );
}

export async function Project() {
  const projects = await getProjectsAction();
  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <ProjectPagination length={projects.length} />
    </div>
  );
}
