"use client";

import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useRef } from "react";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { AutoCompleteList } from "./autocomplete-list";
import { useAutocomplete } from "@/hooks/use-autocomplete";
import { Identifier } from "@/lib/types/identifiers";

type Props = {
  items: Identifier[];
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  onInputChange?: (value: string) => void;
  enforceIdentifierValidation?: boolean;
};

export function AutoComplete({
  items,
  isLoading = false,
  placeholder = "",
  className,
  onInputChange,
  enforceIdentifierValidation = false,
}: Props) {
  const IDENTIFIER_REGEX = /^[a-zA-Z_][a-zA-Z0-9_\.]*$/;

  const {
    isOpen,
    setIsOpen,
    cursorPosition,
    setCursorPosition,
    setWordToFilter,
    dropdownOffset,
    calculateDropdownOffset,
    filteredItems,
    inputValue,
    setInputValue,
  } = useAutocomplete(items, onInputChange);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectItem = (selectedItem: string) => {
    const textBeforeCursor = inputValue.substring(0, cursorPosition);
    const lastSpaceIndex = textBeforeCursor.lastIndexOf(" ");
    const startOfWordToFilter = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
    const newValue =
      inputValue.substring(0, startOfWordToFilter) +
      selectedItem +
      inputValue.substring(cursorPosition);

    setInputValue(newValue);

    // set cursor position to the end of the word that was inserted
    const newCursorPosition = startOfWordToFilter + selectedItem.length;
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        );
        inputRef.current.focus();
      }

      setIsOpen(false);
    });
  };

  const handleFilterChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    const cursorPos = inputElement.selectionStart || 0;
    const textBeforeCursor = inputValue.substring(0, cursorPos);
    const currentWordUpToCursor = textBeforeCursor.split(/\s+/).pop() || "";
    setWordToFilter(currentWordUpToCursor);
    setCursorPosition(cursorPos);

    // finds the correct position to display the autocomplete list
    // based on the current cursor position
    // accounts for font, size, case, etc.
    calculateDropdownOffset(inputElement, textBeforeCursor);
  };

  const validateInput = (value: string): string => {
    if (!enforceIdentifierValidation) return value;
    if (!value) return value;
    if (IDENTIFIER_REGEX.test(value)) {
      return value;
    }
    return inputValue;
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Popover
        open={isOpen && filteredItems.length > 0}
        onOpenChange={setIsOpen}
      >
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={inputValue}
              onValueChange={(value) => {
                const validatedValue = validateInput(value);
                setInputValue(validatedValue);
                setIsOpen(
                  validatedValue.length > 0 && !validatedValue.endsWith(" ")
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  if (isOpen && filteredItems.length > 0) {
                    e.preventDefault();
                    const selectedItem = document.querySelector(
                      '[cmdk-item][aria-selected="true"]'
                    );
                    if (selectedItem instanceof HTMLElement) {
                      selectedItem.click();
                    }
                    return;
                  }
                  return;
                }
                if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              onFocus={() => setIsOpen(inputValue.length > 0)}
            >
              <Input
                ref={inputRef}
                placeholder={placeholder}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 focus:border-0 focus-visible:border-0"
                onSelect={handleFilterChange}
                onChange={handleFilterChange}
                onClick={handleFilterChange}
                onBlur={() => {
                  setTimeout(() => setIsOpen(false), 100);
                }}
              />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          <AutoCompleteList
            onSelectItem={onSelectItem}
            items={filteredItems}
            dropdownOffset={dropdownOffset}
            isOpen={isOpen}
            isLoading={isLoading}
          />
        </Command>
      </Popover>
    </div>
  );
}
