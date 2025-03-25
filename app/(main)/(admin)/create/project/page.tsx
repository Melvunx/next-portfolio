import { SubmitButton } from "@/components/SubmitButton";
import { createProjectAction } from "../create.action";

export default function Page() {
  return (
    <form
      action={async () => {
        "use server";

        await createProjectAction();
      }}
    >
      <SubmitButton />
    </form>
  );
}
