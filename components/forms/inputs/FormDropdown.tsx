import { DropdownButton } from "@/components/buttons";
import ControlledInput from "./ControlledInput";

type Props<T> = {
  name: string;
  label?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
};

export default function FormDropdown<T>({
  name,
  label,
  options,
  getOptionLabel,
  getOptionValue,
}: Props<T>) {
  // Extract just the labels for the dropdown UI to display
  const labels = options.map(getOptionLabel);

  return (
    <ControlledInput
      name={name}
      label={label}
      render={(field) => {
        const selectedOption = options.find(
          (opt) => getOptionValue(opt) === field.value
        );

        const displayLabel = selectedOption ? getOptionLabel(selectedOption) : undefined;

        return (
          <DropdownButton
            options={labels}
            value={displayLabel}
            onChange={(selectedLabel) => {
              const chosenOption = options.find(
                (opt) => getOptionLabel(opt) === selectedLabel
              );
              if (chosenOption) {
                field.onChange(getOptionValue(chosenOption));
              }
            }}
          />
        );
      }}
    />
  );
}