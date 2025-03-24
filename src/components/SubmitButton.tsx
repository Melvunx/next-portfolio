"use client";

import { useFormStatus } from "react-dom";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  submit?: string;
  submiting?: string;
  className?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  submit = "Soumettre",
  submiting = "Soumission en cours ...",
  className,
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn("dark:text-black border-1", className)}
      disabled={pending}
    >
      {pending ? submiting : submit}
    </Button>
  );
};
