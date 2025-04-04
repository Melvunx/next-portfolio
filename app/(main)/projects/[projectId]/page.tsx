import { redirect } from "next/navigation";
import { getProjectIdAction } from "../project.action";

export default async function Page(props: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await props.params;
  const project = await getProjectIdAction(projectId);

  if (!project) redirect("/");

  return <div></div>;
}
