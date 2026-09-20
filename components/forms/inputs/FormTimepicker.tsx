"use client";

import { fromAppTime, toTimePicker } from "@/lib/timeUtils";
import { useFormContext } from "react-hook-form";
import TimePicker from "../../timepicker/TimePicker";
import ControlledInput from "./ControlledInput";

interface RHFTimePickerProps {
  name: string;
  label?: string;
}

export default function FormTimePicker({ name, label }: RHFTimePickerProps) {
  const { getValues } = useFormContext(); 

  return (
    <ControlledInput
      name={name}
      label={label}
      render={(field) => {
        // READ: Convert standard ISO UTC string from database -> "h:mm a" in Chicago time
        const displayValue = toTimePicker(field.value);

        return (
          <TimePicker
            value={displayValue}
            onChange={(time12h) => {
              if (!time12h) {
                field.onChange("");
                return;
              }

              // 1. Get the current shiftDate from form state to act as the base date anchor
              const formShiftDate = getValues("shiftDate");

              // 2. WRITE: Merge time12h with the shiftDate context and get an absolute ISO UTC string
              const utcIsoString = fromAppTime(time12h, formShiftDate);

              field.onChange(utcIsoString);
            }}
          />
        );
      }}
    />
  );
}
