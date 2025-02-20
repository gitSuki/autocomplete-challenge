import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIdentifiers } from "@/context/identifiers-context";

const SidebarPanel = () => {
  const { environment } = useIdentifiers();

  const custom = environment.custom.map((c) => c.code).join("\n");
  const functions = environment.functions.map((f) => f.code).join("\n");
  const variables = environment.variables.map((v) => v.code).join("\n");
  const constants = environment.constants.map((c) => c.code).join("\n");

  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <h1 className="text-lg font-medium">Identifiers</h1>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2">
          {custom && (
            <>
              <p className="text-xs font-medium uppercase tracking-wider">
                Custom
              </p>
              <pre className="text-xs text-emerald-500">{custom}</pre>
              <Separator className="my-2" />
            </>
          )}
          <p className="text-xs font-medium uppercase tracking-wider">
            Functions
          </p>
          <pre className="text-xs text-purple-500">{functions}</pre>
          <Separator className="my-2" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Variables
          </p>
          <pre className="text-xs text-indigo-500">{variables}</pre>
          <Separator className="my-2" />
          <p className="text-xs font-medium uppercase tracking-wider">
            Constants
          </p>
          <pre className="text-xs text-orange-500">{constants}</pre>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarPanel;
