"use client";

import { useDrawer } from "@/hooks";
import clsx from "clsx";
import { Check } from "lucide-react";
import { ElementType, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownButtonProps<T extends string> {
  Icon?: ElementType;
  buttonStyle?: string;
  drawerStyle?: string;
  options: T[];
  value?: T; // Keep single value for SetStateAction<string> compatibility
  onChange?: (value: string) => void; 
  multiple?: boolean; // Note: multiple true usually breaks SetStateAction<string> logic
}

export default function DropdownButton<T extends string>({
  Icon,
  buttonStyle,
  drawerStyle,
  options = [],
  value,
  onChange,
  multiple = false,
}: DropdownButtonProps<T>) {
  const { isMounted, animation, closeDrawer, toggleDrawer } = useDrawer();

  // Fallback state if no value/onChange is passed
  const [internalState, setInternalState] = useState<T>("" as T);
  
  const selected = value !== undefined ? value : internalState;

  const handleSelect = (option: T) => {
    if (multiple) {
      // Logic for multiple if needed, but note this conflicts with SetStateAction<string>
      // If you strictly need Dispatch<SetStateAction<string>>, 'multiple' should likely be false
    } else {
      if (onChange) {
        onChange(option as string); 
      } else {
        setInternalState(option);
      }
      closeDrawer();
    }
  };

  console.log(value)

  const getDisplayText = () => {
    if (!selected || selected === "") return "Select Option";
    return String(selected);
  };

  return (
    <div className="relative text-else">
      <button
        type="button"
        onClick={toggleDrawer}
        className={twMerge(
          "snappy spaced gap-x-2 bg-background hover:bg-surface-1 text-sm capitalize w-full border border-border rounded-lg normal-space text-else",
          buttonStyle
        )}
      >
        {getDisplayText()}
        {Icon && <Icon size={25} />}
      </button>

      {isMounted && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDrawer} />

          <aside
            className={twMerge(
              clsx(
                "absolute bg-background w-32 border border-adjust z-20 max-h-40 overflow-y-auto scrollbar-none top-12 rounded-xl",
                animation ? "animate-ghostIn" : "animate-ghostOut"
              ),
              drawerStyle
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col w-full">
              {options.map((option) => {
                const isSelected = selected === option;

                return (
                  <li key={String(option)}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      className="flex items-center text-else w-full text-sm text-left capitalize px-3 py-1  hover:bg-surface-1 hover:text-main easy-transition gap-x-2"
                    >
                      {multiple && (
                        <span className="w-4">
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </span>
                      )}
                      <span>{String(option)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </>
      )}
    </div>
  );
}
