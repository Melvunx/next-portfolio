import { authUser } from "@/components/lib/auth-session";
import { SubmitButton } from "@/components/SubmitButton";
import { getAccountIdAction, sendLetterAction } from "./main.action";

export default function Page() {
  return (
    <div>
      Main page
      {/* Faire un grid avec une belle présentation |me contacter | formulaire| */}
      <form
        action={async (data) => {
          "use server";
          const user = await authUser();

          const accountId = user ? await getAccountIdAction(user.id) : null;

          const credentials = {
            sender: data.get("sender") as string,
            email: data.get("email") as string,
            object: data.get("object") as string,
            message: data.get("message") as string,
            accountId: accountId ? accountId : undefined,
          };

          await sendLetterAction(credentials);
        }}
      >
        <div>
          <div>
            <label htmlFor="send" className="floating-label">
              <span>Votre nom</span>
              <input
                type="text"
                minLength={3}
                maxLength={30}
                pattern="^[a-zA-Z ]+$"
                name="sender"
                id="send"
                className="input validator"
                required
              />
              <p className="validator-hint">
                Votre nom doit contenir entre 3 et 30 caractères et ne doit pas
                contenir de caractères spéciaux.
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="email" className="floating-label">
              <span>Votre e-mail</span>
              <input
                type="email"
                name="email"
                id="email"
                maxLength={50}
                className="input validator"
                required
              />
              <p className="validator-hint">
                Entrez une adresse e-mail valide.
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="obj" className="floating-label">
              <span>Objet</span>
              <input
                type="text"
                name="object"
                id="obj"
                minLength={3}
                maxLength={50}
                className="input validator"
                required
              />
              <p className="validator-hint">
                {"L'objet doit contenir entre 3 et 50 caractères."}
              </p>
            </label>
          </div>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Votre message</legend>
          <textarea
            name="message"
            className="textarea h-40 resize-none validator"
            minLength={10}
            maxLength={500}
            required
          ></textarea>
          <p className="validator-hint">
            Le message doit contenir entre 10 et 500 caractères.
          </p>
        </fieldset>
        <SubmitButton />
      </form>
    </div>
  );
}
