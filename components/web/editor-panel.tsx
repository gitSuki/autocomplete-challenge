import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EquationRow } from "./equation-row";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEquations } from "@/context/equations-context";
import { cn } from "@/lib/utils";

const EditorPanel = () => {
  const { equations, addEquation, deleteEquation } = useEquations();

  return (
    <ScrollArea
      className={cn(
        "h-full w-full p-4 md:pr-6 flex flex-col gap-4"
        // "bg-gradient-to-br dark:from-slate-950 from-10% dark:via-slate-950 via-60% dark:to-slate-900 to-90%"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-lg font-medium">Equations</h1>
        <Button
          variant="secondary"
          size="sm"
          className="ml-auto shadow-lg"
          onClick={addEquation}
        >
          <PlusIcon className="w-4 h-4" />
          Add Equation
        </Button>
      </div>
      {equations.map((equation) => (
        <EquationRow
          key={equation.id}
          equation={equation}
          onDelete={() => deleteEquation(equation.id)}
        />
      ))}
    </ScrollArea>
  );
};

export default EditorPanel;
