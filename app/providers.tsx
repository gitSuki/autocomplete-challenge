"use client";

import { ThemeProvider } from "@/components/web/theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={["dark", "light"]}
    >
      {children}
    </ThemeProvider>
  );
}
