import { createContext, useContext, ReactNode, useState } from "react";
import { Identifier, EquationEnvironment } from "@/lib/types/identifiers";
import { variables, functions, constants } from "@/lib/data/data";

interface IdentifiersContextType {
  environment: EquationEnvironment;
  allIdentifiers: Identifier[];
  addCustomIdentifier: (code: string, id: string) => void;
  deleteCustomIdentifier: (id: string) => void;
}

const IdentifiersContext = createContext<IdentifiersContextType | undefined>(
  undefined
);

const initialEnvironment: EquationEnvironment = {
  custom: [],
  variables: variables.sort((a, b) => a.code.localeCompare(b.code)),
  functions: functions.sort((a, b) => a.code.localeCompare(b.code)),
  constants: constants.sort((a, b) => a.code.localeCompare(b.code)),
};

export function IdentifiersProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] =
    useState<EquationEnvironment>(initialEnvironment);

  const allIdentifiers = [
    ...environment.custom,
    ...environment.variables,
    ...environment.functions,
    ...environment.constants,
  ].sort((a, b) => a.code.localeCompare(b.code));

  const addCustomIdentifier = (code: string, id: string) => {
    setEnvironment((prev) => ({
      ...prev,
      custom: [
        ...prev.custom.filter((identifier) => identifier.id !== id),
        { id, code, type: "custom" },
      ],
    }));
  };

  const deleteCustomIdentifier = (id: string) => {
    setEnvironment((prev) => ({
      ...prev,
      custom: prev.custom.filter((identifier) => identifier.id !== id),
    }));
  };

  return (
    <IdentifiersContext.Provider
      value={{
        environment,
        allIdentifiers,
        addCustomIdentifier,
        deleteCustomIdentifier,
      }}
    >
      {children}
    </IdentifiersContext.Provider>
  );
}

export function useIdentifiers() {
  const context = useContext(IdentifiersContext);
  if (context === undefined) {
    throw new Error(
      "useIdentifiers must be used within an IdentifiersProvider"
    );
  }
  return context;
}
