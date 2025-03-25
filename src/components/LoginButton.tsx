import { headers } from "next/headers";
import Image from "next/image";
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

type ProviderFormProps = {
  provider: Provider;
  link: string;
  width?: number;
  height?: number;
  className?: string;
};

const ProviderForm: React.FC<ProviderFormProps> = ({
  provider,
  link,
  width = 30,
  height = 30,
  className,
}) => {
  return (
    <form
      className="w-full"
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
      <Button
        className="flex items-center justify-evenly w-full"
        type="submit"
        variant="ghost"
      >
        Sign in with {provider}
        <Image
          src={link}
          className={className}
          alt={`provider-${provider}`}
          width={width}
          height={height}
        />
      </Button>
    </form>
  );
};

export function LoginButton() {
  const buttons = [
    {
      provider: "google",
      image:
        "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
      className: undefined,
    },
    {
      provider: "github",
      image:
        "https://img.icons8.com/?size=100&id=106562&format=png&color=000022",
      className: "rounded-full bg-white",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Connexion</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Sélectionner un moyen de connexion
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-1 my-1 light:border-gray-200 dark:border-gray-700" />
        <DropdownMenuGroup>
          {buttons.map((button, idx) => (
            <DropdownMenuItem key={idx} className="flex">
              <ProviderForm
                provider={button.provider as Provider}
                link={button.image}
                className={button.className}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
