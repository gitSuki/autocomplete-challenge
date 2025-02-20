import { createContext, useContext, ReactNode, useState } from "react";
import { Equation } from "@/lib/types/equation";
import { generateUUID } from "@/lib/utils";

interface EquationsContextType {
  equations: Equation[];
  addEquation: () => void;
  deleteEquation: (id: string) => void;
}

const EquationsContext = createContext<EquationsContextType | undefined>(
  undefined
);

export function EquationsProvider({ children }: { children: ReactNode }) {
  const [equations, setEquations] = useState<Equation[]>([
    { id: generateUUID(), lhs: "", rhs: "" },
  ]);

  const addEquation = () => {
    const blankEquation: Equation = { id: generateUUID(), lhs: "", rhs: "" };
    setEquations((prev) => [...prev, blankEquation]);
  };

  const deleteEquation = (id: string) => {
    setEquations((prev) => prev.filter((equation) => equation.id !== id));
  };

  return (
    <EquationsContext.Provider
      value={{
        equations,
        addEquation,
        deleteEquation,
      }}
    >
      {children}
    </EquationsContext.Provider>
  );
}

export function useEquations() {
  const context = useContext(EquationsContext);
  if (context === undefined) {
    throw new Error("useEquations must be used within an EquationsProvider");
  }
  return context;
}
