import { ProjectCardType } from "@/schema/project";
import { getTechnologies } from "@app/(main)/(admin)/create/project/project.utils";
import { getProjectsAction } from "@app/(main)/projects/project.action";
import { Technology } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { PaginationControls } from "./PaginationControls";
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

export async function TechnologyFilter({
  technology,
}: {
  technology: Technology;
}) {
  return (
    <div>
      <input
        type="reset"
        name="frameworks"
        className="btn btn-square"
        value="x"
      />
      <input
        type="radio"
        name="frameworks"
        className="btn"
        aria-label={technology.name}
      />
    </div>
  );
}

export async function Project() {
  const projects = await getProjectsAction();
  const technologies = await getTechnologies();

  return (
    <div>
      <form className="filter">
        {technologies.map((technology) => (
          <TechnologyFilter key={technology.id} technology={technology} />
        ))}
      </form>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <PaginationControls totalItems={projects.length} itemsPerPage={5} />
    </div>
  );
}
