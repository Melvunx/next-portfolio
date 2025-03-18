import { Provider, ProviderLoginAction } from "../../app/login.action";
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

const ProviderForm = ({ provider }: { provider: Provider }) => {
  return (
    <form action={() => ProviderLoginAction(provider)}>
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
