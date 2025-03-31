import { ProjectCardType } from "@/schema/project";
import { getProjectsAction } from "@app/(main)/projects/project.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export async function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export function ProjectPagination({ length }: { length: number }) {
  return <div>Enter {length}</div>;
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
