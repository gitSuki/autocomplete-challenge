import { Identifier } from "@/lib/types/identifiers";
import { generateUUID } from "@/lib/utils";

export const variables: Identifier[] = [
  { id: generateUUID(), code: "x", type: "variable" },
  { id: generateUUID(), code: "y", type: "variable" },
  { id: generateUUID(), code: "Foo", type: "variable" },
  { id: generateUUID(), code: "Bar", type: "variable" },
  { id: generateUUID(), code: "Baz", type: "variable" },
  { id: generateUUID(), code: "UpperCamelCaseVariable", type: "variable" },
  { id: generateUUID(), code: "lowerCamelCaseVariable", type: "variable" },
  { id: generateUUID(), code: "snake_case_variable", type: "variable" },
  { id: generateUUID(), code: "Inlet.mixture.T", type: "variable" },
  { id: generateUUID(), code: "Inlet.mixture.P", type: "variable" },
  { id: generateUUID(), code: "Inlet.mixture.rho_mass", type: "variable" },
  { id: generateUUID(), code: "Inlet.mixture.h_mass", type: "variable" },
  { id: generateUUID(), code: "Inlet.rate.m", type: "variable" },
  { id: generateUUID(), code: "Inlet.rate.v", type: "variable" },
  { id: generateUUID(), code: "Outlet.mixture.T", type: "variable" },
  { id: generateUUID(), code: "Outlet.mixture.P", type: "variable" },
  { id: generateUUID(), code: "Outlet.mixture.rho_mass", type: "variable" },
  { id: generateUUID(), code: "Outlet.mixture.h_mass", type: "variable" },
  { id: generateUUID(), code: "Outlet.rate.m", type: "variable" },
  { id: generateUUID(), code: "Outlet.rate.v", type: "variable" },
];

export const functions: Identifier[] = [
  { id: generateUUID(), code: "SQRT", type: "function" },
  { id: generateUUID(), code: "LOG", type: "function" },
  { id: generateUUID(), code: "EXP", type: "function" },
  { id: generateUUID(), code: "SIN", type: "function" },
  { id: generateUUID(), code: "COS", type: "function" },
  { id: generateUUID(), code: "TAN", type: "function" },
  { id: generateUUID(), code: "ROUND", type: "function" },
  { id: generateUUID(), code: "CEIL", type: "function" },
  { id: generateUUID(), code: "FLOOR", type: "function" },
  { id: generateUUID(), code: "ABS", type: "function" },
  { id: generateUUID(), code: "SIGN", type: "function" },
  { id: generateUUID(), code: "POW", type: "function" },
  { id: generateUUID(), code: "MOD", type: "function" },
];

export const constants: Identifier[] = [
  { id: generateUUID(), code: "pi", type: "constant" },
  { id: generateUUID(), code: "e", type: "constant" },
  { id: generateUUID(), code: "c", type: "constant" },
  { id: generateUUID(), code: "MagicConstant", type: "constant" },
  { id: generateUUID(), code: "T_STP", type: "constant" },
  { id: generateUUID(), code: "P_STP", type: "constant" },
];
