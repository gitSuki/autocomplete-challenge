import { AutoComplete } from "@/components/autocomplete/autocomplete";
import { Equation } from "@/lib/types/equation";
import { useIdentifiers } from "@/context/identifiers-context";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";

interface EquationRowProps {
  equation: Equation;
  onDelete: () => void;
}

export const EquationRow = ({ equation, onDelete }: EquationRowProps) => {
  const [lhs, setLhs] = useState<string>(equation.lhs);
  const [rhs, setRhs] = useState<string>(equation.rhs || "");
  const { allIdentifiers, addCustomIdentifier, deleteCustomIdentifier } =
    useIdentifiers();

  // debounced to prevent exessive re-renders and api calls
  const debouncedAddIdentifier = useDebouncedCallback(() => {
    const lhsTrimmed = lhs.trim();
    const lhsExists = allIdentifiers.some(
      (identifier) => identifier.code === lhsTrimmed
    );

    if (lhsTrimmed && !lhsExists && rhs.trim()) {
      addCustomIdentifier(lhsTrimmed, equation.id);
    }
  }, 300);

  const handleDelete = () => {
    deleteCustomIdentifier(equation.id);
    onDelete();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 md:gap-4 p-4 my-8 rounded-2xl shadow-md bg-gradient-to-r from-slate-200 to-slate-100 ",
        "dark:from-slate-800 dark:to-slate-800"
      )}
    >
      <AutoComplete
        items={allIdentifiers}
        className="min-w-[5rem] flex-[3]"
        onInputChange={(value) => {
          setLhs(value);
          debouncedAddIdentifier();
        }}
      />
      <span className={cn("text-lg text-gray-500")}>=</span>
      <AutoComplete
        items={allIdentifiers}
        className="min-w-[5rem] flex-[5]"
        onInputChange={(value) => {
          setRhs(value);
          debouncedAddIdentifier();
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "transition-all w-9 hover:w-24 group flex items-center justify-center gap-2",
          "text-destructive hover:text-destructive hover:bg-destructive/10",
          "dark:text-red-400 dark:hover:text-red-400 dark:hover:bg-red-400/10"
        )}
        onClick={handleDelete}
      >
        <Trash2Icon className="h-4 w-4" />
        <span
          className={cn(
            "opacity-0 group-hover:opacity-100",
            "whitespace-nowrap overflow-hidden"
          )}
        >
          Delete
        </span>
      </Button>
    </div>
  );
};
