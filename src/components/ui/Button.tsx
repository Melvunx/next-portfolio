import { cn } from "@lib/utils";
import { cva } from "class-variance-authority";

type ButtonColor =
  | "btn-neutral"
  | "btn-primary"
  | "btn-secondary"
  | "btn-accent"
  | "btn-success"
  | "btn-info"
  | "btn-warning"
  | "btn-error";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonColor;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "btn-neutral",
  className,
}) => {
  return (
    <button onClick={onClick} className={cn("btn", className, variant)}>
      {children}
    </button>
  );
};

export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      success: "btn-success",
      info: "btn-info",
      warning: "btn-warning",
      error: "btn-error",
    },
    size: {
      default: "btn-md",
      xs: "btn-xs",
      sm: "btn-sm",
      lg: "btn-lg",
      xl: "btn-xl",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "default",
  },
});
