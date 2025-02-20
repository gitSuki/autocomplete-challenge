export interface Identifier {
  id: string;
  code: string;
  type: "variable" | "function" | "constant" | "custom";
}

export interface EquationEnvironment {
  custom: Identifier[];
  variables: Identifier[];
  functions: Identifier[];
  constants: Identifier[];
}
