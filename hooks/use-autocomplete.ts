import { useState, useMemo, useCallback } from "react";
import { Identifier } from "@/lib/types/identifiers";

export function useAutocomplete(
  items: Identifier[],
  onChange?: (value: string) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [wordToFilter, setWordToFilter] = useState("");
  const [dropdownOffset, setDropdownOffset] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  const filteredItems = useMemo(() => {
    if (!wordToFilter) return [];
    return items.filter((item) =>
      item.code.toLowerCase().startsWith(wordToFilter.toLowerCase())
    );
  }, [items, wordToFilter]);

  const calculateDropdownOffset = (
    inputElement: HTMLInputElement,
    textBeforeCursor: string
  ) => {
    // finds the correct position to display the autocomplete list
    // based on the current cursor position
    // accounts for font, size, case, etc.
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.font = window.getComputedStyle(inputElement).font;
      const offset = ctx.measureText(textBeforeCursor).width;
      setDropdownOffset(offset + 10);
    }
  };

  return {
    isOpen,
    setIsOpen,
    cursorPosition,
    setCursorPosition,
    wordToFilter,
    setWordToFilter,
    dropdownOffset,
    setDropdownOffset,
    filteredItems,
    calculateDropdownOffset,
    inputValue,
    setInputValue: handleInputChange,
  };
}
