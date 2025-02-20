"use client";

import { ThemeProvider as ThemeProviderBase } from "next-themes";
import { Theme } from "@/lib/types/theme";

type ThemeProviderBaseProps = React.ComponentProps<typeof ThemeProviderBase>;

interface ThemeProviderProps
  extends Omit<ThemeProviderBaseProps, "themes" | "defaultTheme"> {
  themes?: Theme[];
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  themes,
  defaultTheme,
  ...props
}: ThemeProviderProps) {
  return (
    <ThemeProviderBase themes={themes} defaultTheme={defaultTheme} {...props}>
      {children}
    </ThemeProviderBase>
  );
}
