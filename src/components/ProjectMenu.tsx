import { Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ProjectMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-none">
          Projets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-sm">
        <DropdownMenuLabel className="flex items-center justify-evenly">
          <Folder /> Mes Projets
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* 2 projets */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/projects">
          <Button variant="outline">Voir tous mes projets</Button>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
