"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxOption {
  value: string;
  label: string;
  hasSubOptions?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  multiple = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(selectedValue)
        ? currentValues.filter((v) => v !== selectedValue)
        : [...currentValues, selectedValue];
      onChange(newValues);
    } else {
      onChange(selectedValue === value ? "" : selectedValue);
      setOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;

      // Show selected labels instead of count
      const selectedLabels = options
        .filter(
          (option) => Array.isArray(value) && value.includes(option.value)
        )
        .map((option) => {
          // Extract text from HTML
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = option.label;
          return tempDiv.textContent || tempDiv.innerText || option.label;
        });

      return selectedLabels.join(", ") || placeholder;
    }

    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return placeholder;

    // Extract text from HTML for display
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = selectedOption.label;
    return tempDiv.textContent || tempDiv.innerText || selectedOption.label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            "h-12 px-4 py-3",
            "bg-white dark:bg-gray-800",
            "border border-gray-200 dark:border-gray-600",
            "rounded-md",
            "shadow-sm hover:shadow-md",
            "transition-all duration-200",
            "hover:border-primary/60",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "text-gray-900 dark:text-gray-100",
            open && "border-primary ring-2 ring-primary/20",
            className
          )}
        >
          <span
            className={cn(
              "truncate text-left",
              (!value ||
                (multiple && Array.isArray(value) && value.length === 0)) &&
                "text-gray-500"
            )}
          >
            {getDisplayValue()}
          </span>
          <ChevronsUpDown
            className={cn(
              "ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
              open && "rotate-180 text-primary"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] md:w-[600px] p-0 bg-white dark:bg-gray-800 border-0 shadow-xl rounded-xl overflow-hidden"
        align="start"
        sideOffset={4}
      >
        <Command className="border border-gray-200 dark:border-gray-300 rounded-xl">
          <div className="px-3 pt-3">
            <CommandInput
              placeholder="Search options..."
              className="h-9 outline-none focus:ring-0 dark:text-white"
            />
          </div>
          <CommandList className="max-h-64">
            <CommandEmpty className="py-6 text-center text-gray-500 text-sm">
              No options found.
            </CommandEmpty>
            <CommandGroup className="p-2">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    "px-3 py-3 rounded-lg",
                    "text-gray-700 dark:text-gray-300",
                    "transition-all duration-200",
                    "cursor-pointer",
                    "hover:bg-primary/10 hover:text-primary",
                    "data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary",
                    "border border-transparent hover:border-primary/20",
                    "flex items-center space-x-3"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      "transition-all duration-200",
                      multiple
                        ? cn(
                            "w-5 h-5 rounded border-2",
                            Array.isArray(value) && value.includes(option.value)
                              ? "bg-primary border-primary text-white"
                              : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700"
                          )
                        : cn(
                            "w-5 h-5 rounded-full border-2",
                            value === option.value
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700"
                          )
                    )}
                  >
                    {multiple
                      ? Array.isArray(value) &&
                        value.includes(option.value) && (
                          <Check className="h-3 w-3" />
                        )
                      : value === option.value && <Check className="h-3 w-3" />}
                  </div>
                  <div
                    className="flex-1 text-sm font-medium"
                    dangerouslySetInnerHTML={{ __html: option.label }}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
