"use client";

import { useDrawer } from "@/hooks";
import clsx from "clsx";
import { Check } from "lucide-react";
import { ElementType, useState } from "react";
import { twMerge } from "tailwind-merge";

type DropdownButtonProps<T extends string> = {
  Icon?: ElementType;
  buttonStyle?: string;
  drawerStyle?: string;
  options: T[];
} & (
  | {
      multiple: true;
      value?: T[];
      onChange?: (value: T[]) => void;
    }
  | {
      multiple?: false;
      value?: T;
      onChange?: (value: T) => void;
    }
);

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
  const [internalState, setInternalState] = useState<T>("" as T);
  
  const selected = value !== undefined ? value : internalState;

  const handleSelect = (option: T) => {
    if (multiple) {
      const currentValues = Array.isArray(value)
        ? value
        : Array.isArray(internalState)
          ? internalState
          : [];

      const nextValues = currentValues.includes(option)
        ? currentValues.filter((item) => item !== option)
        : [...currentValues, option];

      if (onChange) {
        onChange(nextValues as T[]);
      } else {
        setInternalState(nextValues);
      }

      return;
    }

    if (onChange) {
      onChange(option as T);
    } else {
      setInternalState(option);
    }

    closeDrawer();
  };

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
