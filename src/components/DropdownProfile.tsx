import { User } from "better-auth";
import { User as UserProfile } from "lucide-react";
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

export function DropdownProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="avatar">
            <div className="w-8 rounded-full">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={1000}
                  height={1000}
                />
              ) : (
                user.name[0].toUpperCase()
              )}
            </div>
          </div>
          {user.name ?? user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <UserProfile />
          Mon compte
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{user.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
        <DropdownMenuItem>
          <form>
            <Button
              variant="ghost"
              formAction={async () => {
                "use server";

                await auth.api.signOut({
                  headers: await headers(),
                });

                redirect("/");
              }}
            >
              Déconexion
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
