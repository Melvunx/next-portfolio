import { getRequiredUser } from "@/components/lib/auth-session";
import { SubmitButton } from "@/components/SubmitButton";
import { CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { updateUserNameAction } from "./change_name.action";

export default async function Page(props: {
  params: Promise<{ userId: string }>;
}) {
  const user = await getRequiredUser();
  const { userId } = await props.params;

  if (user.id !== userId) return redirect("/");

  return (
    <div className="card w-96 p-2 mx-auto bg-primary dark:border-1 card-lg shadow-md">
      <div className="card-body">
        <h2 className="card-title mb-5 text-black">Changer votre nom !</h2>
        <CardDescription className="dark:text-black italic">
          Choisissez avec soin votre nouveau nom !
        </CardDescription>
        <form
          action={async (formData) => {
            "use server";

            const credentials = {
              userId,
              name: formData.get("name") as string,
            };

            await updateUserNameAction(credentials);
          }}
        >
          <label className="floating-label">
            {/* <span>Votre nom</span> */}
            <input
              type="text"
              placeholder={user.name}
              className="input validator"
              pattern="^[a-zA-Z0-9 ]+$"
              minLength={4}
              maxLength={12}
              name="username"
              required
            />
            <p className="validator-hint">
              Veuillez saisir un nom valide (4 à 12 caractères, lettres et
              chiffre)
            </p>
          </label>
          <div className="card-actions justify-end">
            <SubmitButton className="bg-primary-content dark:text-white" />
          </div>
        </form>
      </div>
    </div>
  );
}
