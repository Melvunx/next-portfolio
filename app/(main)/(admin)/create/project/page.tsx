import { SubmitButton } from "@/components/SubmitButton";

export default function Page() {
  return (
    <form
      action={async () => {
        "use server";

        // await createProjectAction();
      }}
    >
      <SubmitButton />
    </form>
  );
}
