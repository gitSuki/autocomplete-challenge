import { useTheme as useThemeBase } from "next-themes";
import { Theme } from "@/lib/types/theme";

export const useTheme = () => {
  const { theme, setTheme, ...rest } = useThemeBase();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return {
    theme: theme as Theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    toggleTheme,
    ...rest,
  };
};
