"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { AutoCompleteListItem } from "@/components/autocomplete/autocomplete-list-item";
import { Identifier } from "@/lib/types/identifiers";
import { cn } from "@/lib/utils";

type AutoCompleteListProps = {
  onSelectItem: (value: string) => void;
  dropdownOffset: number;
  items: Identifier[];
  isOpen: boolean;
  isLoading?: boolean;
  className?: string;
};

export function AutoCompleteList({
  onSelectItem,
  dropdownOffset,
  items,
  isOpen,
  isLoading = false,
  className,
}: AutoCompleteListProps) {
  if (!isOpen) {
    return <CommandList aria-hidden="true" className="hidden" />;
  }

  return (
    <PopoverContent
      asChild
      onOpenAutoFocus={(e) => e.preventDefault()}
      onInteractOutside={(e) => {
        if (
          e.target instanceof Element &&
          e.target.hasAttribute("cmdk-input")
        ) {
          e.preventDefault();
        }
      }}
      style={{
        transform: `translateX(${dropdownOffset}px)`,
        width: "auto",
        minWidth: "200px",
        maxWidth: `calc(100vw - ${dropdownOffset}px - 1rem)`,
      }}
      align="start"
      sideOffset={-1.65}
    >
      <CommandList className={cn("p-0", className)}>
        {isLoading && (
          <CommandPrimitive.Loading>
            <div className="p-1">Loading...</div>
          </CommandPrimitive.Loading>
        )}
        {items.length > 0 && !isLoading && (
          <CommandGroup className="px-1">
            {items.map((item) => (
              <AutoCompleteListItem
                key={item.id}
                item={item}
                onSelect={onSelectItem}
              />
            ))}
          </CommandGroup>
        )}
        {!isLoading && items.length === 0 && <CommandEmpty></CommandEmpty>}
      </CommandList>
    </PopoverContent>
  );
}
