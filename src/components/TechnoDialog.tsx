import { getCategories } from "@app/(main)/(admin)/create/project/project.utils";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export async function TechnoDialog() {
  const categories = await getCategories();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter des technologies</Button>
      </DialogTrigger>
      <DialogContent className="light:bg-white">
        <DialogHeader>
          <DialogTitle>Technologies</DialogTitle>
          <DialogDescription>
            Ajout des technologies par catégorie
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-80 w-96 mx-auto rounded-md border">
          <div className="p-2 bg-accent">
            {categories.map((category) => (
              <div key={category.id}>
                <h4>{category.name}</h4>
                <Separator className="my-2 bg-base-content" />
                <div className="flex flex-col gap-1">
                  {category.technologies.map((techno, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`techno-${techno.id}`} />
                      <label
                        htmlFor={`techno-${techno.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {techno.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
