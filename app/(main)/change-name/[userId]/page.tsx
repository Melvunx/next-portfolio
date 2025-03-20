import { getRequiredUser } from "@/components/lib/auth-session";
import { redirect } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const user = await getRequiredUser();
  const { userId } = await props.params;

  if (user.id !== userId) return redirect("/");

  return <div>change name {userId}</div>;
}
