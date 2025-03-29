"use client";

import { Categories } from "@/schema/category";
import { formProjectAction } from "@app/(main)/(admin)/create/create.action";
import {
  getCategories,
  getProjectStatus,
} from "@app/(main)/(admin)/create/project/project.utils";
import { ProjectStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import { SubmitButton } from "./SubmitButton";
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

export function FormProject() {
  // États pour stocker les données
  const [categories, setCategories] = useState<Categories>([]);
  const [projectStatus, setProjectStatus] = useState<ProjectStatus[]>([]);
  const [technoIds, setTechnoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const statusData = await getProjectStatus();

        setCategories(categoriesData);
        setProjectStatus(statusData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTechnologies = (isChecked: boolean, technoId: string) => {
    if (isChecked) {
      setTechnoIds((prev) =>
        prev.includes(technoId) ? prev : [...prev, technoId]
      );
    } else {
      setTechnoIds((prev) => prev.filter((id) => id !== technoId));
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <form action={async (formData) => await formProjectAction(formData)}>
      <div>
        <label htmlFor="tit" className="floating-label">
          <span>Titre</span>
          <input
            type="text"
            id="tit"
            name="title"
            className="input validator"
            pattern="^[a-zA-Z0-9 ]+$"
            minLength={4}
            maxLength={12}
            required
          />
          <p className="validator-hint">
            Veuillez saisir un nom valide (4 à 12 caractères, lettres et
            chiffre)
          </p>
        </label>
        <label htmlFor="des" className="floating-label">
          <span>Description</span>
          <input
            type="text"
            className="input validator"
            name="description"
            id="des"
            required
            minLength={10}
          />
          <p className="validator-hint">Minimum de 10 charactères</p>
        </label>
      </div>
      <div>
        <label className="input">
          <span className="label">https://github</span>
          <input type="url" placeholder="URL" name="github" />
        </label>
        <label className="input">
          <span className="label">https://production</span>
          <input type="url" placeholder="URL" name="production" />
        </label>
        <label className="input">
          <span className="label">https://image</span>
          <input type="url" placeholder="URL" name="image" />
        </label>
        <label className="input">
          <span className="label">https://vidéo</span>
          <input type="url" placeholder="URL" name="video" />
        </label>
      </div>
      <select name="status" defaultValue="Sélectionner un état">
        <option disabled>Sélectionner un état</option>
        {projectStatus.map((status, idx) => (
          <option key={idx} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
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
                        <Checkbox
                          id={`techno-${techno.id}`}
                          checked={technoIds.includes(techno.id)}
                          onCheckedChange={(checked) =>
                            handleTechnologies(checked === true, techno.id)
                          }
                        />
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
      <SubmitButton />
    </form>
  );
}
