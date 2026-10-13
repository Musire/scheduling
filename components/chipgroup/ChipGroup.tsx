import { ChipButton } from "./ChipButton";

export interface ChipOption<V> {
  label: string;
  value: V | "all"; 
}

interface ChipGroupProps<V extends string | number> {
  label: string;
  options: ChipOption<V>[];
  selectedValues: V[];
  onChange: (updater: (prev: V[]) => V[]) => void;
}

export function ChipGroup<V extends string | number>({ label, options, selectedValues, onChange }: ChipGroupProps<V>) {
  const handleToggle = (value: V | "all") => {
    onChange((prev: V[]) => {
      if (value === "all") {
        return [];
      }
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-main">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected =
            option.value === "all"
              ? selectedValues.length === 0
              : selectedValues.includes(option.value as V);

          return (
            <ChipButton
              key={String(option.value)}
              label={option.label}
              value={option.value}
              isSelected={isSelected}
              onClick={handleToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
