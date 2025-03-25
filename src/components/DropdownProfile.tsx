import { User } from "better-auth";
import { LogOut, Settings, User as UserProfile } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";


export function DropdownProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-none">
          <div className="avatar">
            <div className="w-7 border bg-primary dark:text-primary-content rounded-full">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={1000}
                  height={1000}
                />
              ) : (
                <p className="flex h-full items-center justify-center">
                  {user.name[0].toUpperCase()}
                </p>
              )}
            </div>
          </div>
          {user.name ?? user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-sm">
        <DropdownMenuLabel className="flex items-center justify-evenly">
          <UserProfile />
          Mon compte
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-1 my-1 light:border-gray-200 dark:border-gray-700" />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="space-x-2">
            <Settings />
            Paramètres
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="backdrop-blur-sm">
              <DropdownMenuItem>
                <Link href={`/change-name/${user.id}`}>
                  <Button variant="ghost">Changer de nom</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>

              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
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
              <LogOut className="pl-0" />
              Déconexion
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
