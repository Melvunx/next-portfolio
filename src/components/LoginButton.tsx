import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Provider = "github" | "google";

const ProviderForm = ({ provider }: { provider: Provider }) => {
  return (
    <form
      action={async () => {
        "use server";
        const results = await auth.api.signInSocial({
          body: {
            provider,
          },
          headers: await headers(),
        });

        if (!results.url) {
          throw new Error("No redirect URL");
        }

        redirect(results.url);
      }}
    >
      <Button type="submit">Sign in with {provider}</Button>
    </form>
  );
};

export function LoginButton() {
  const providers = ["google", "github"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Connexion</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Sélectionner un moyen de connexion
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {providers.map((provider, idx) => (
            <DropdownMenuItem key={idx}>
              <ProviderForm provider={provider as Provider} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
