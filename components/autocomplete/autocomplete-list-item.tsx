"use client";

import { CommandItem } from "@/components/ui/command";
import { Identifier } from "@/lib/types/identifiers";
import { cn } from "@/lib/utils";

type AutoCompleteListItemProps = {
  item: Identifier;
  onSelect: (value: string) => void;
  className?: string;
};

export function AutoCompleteListItem({
  item,
  onSelect,
  className,
}: AutoCompleteListItemProps) {
  return (
    <CommandItem
      value={item.code}
      onSelect={onSelect}
      className={cn(
        item.type === "custom" && "text-emerald-500",
        item.type === "function" && "text-purple-500",
        item.type === "variable" && "text-indigo-500",
        item.type === "constant" && "text-orange-500",
        className
      )}
    >
      {item.code}
    </CommandItem>
  );
}
