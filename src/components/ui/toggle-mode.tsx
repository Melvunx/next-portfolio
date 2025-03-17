import { Moon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ToggleMode() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "cupcake" ? "forest" : "cupcake");
  };

  console.log({ theme });

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        value="cupcake"
        checked={theme === "cupcake"}
        onChange={toggleTheme}
        className="theme-controller"
      />
      <Moon size={21} className="swap-on" />
      <SunIcon size={21} className="swap-off" />
    </label>
  );
}
