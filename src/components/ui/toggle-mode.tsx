import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ToggleMode() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "cupcake" ? "forest" : "cupcake");
  };

  console.log({ theme });

  return (
    <label className="flex items-center cursor-pointer gap-2">
      <Moon size={21} />
      <input
        type="checkbox"
        value="cupcake"
        checked={theme === "cupcake"}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <SunIcon size={21} />
    </label>
  );
}
