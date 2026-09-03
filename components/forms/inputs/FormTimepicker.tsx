"use client";

import { fromAppTime, toTimePicker } from "@/lib/timeUtils";
import TimePicker from "../../timepicker/TimePicker";
import ControlledInput from "./ControlledInput"; // Adjust path as needed

interface RHFTimePickerProps {
  name: string;
  label?: string;
}

export default function FormTimePicker({ name, label }: RHFTimePickerProps) {
  return (
    <ControlledInput
      name={name}
      label={label}
      render={(field) => {
        // Convert Date object from RHF to "HH:MM AM/PM" string for TimePicker
        const timeString = toTimePicker(field.value)

        return (
          <TimePicker
            value={timeString}
            onChange={(time12h) => {
              if (!time12h) {
                field.onChange(undefined);
                return;
              }

              // WRITE: Use the helper to process and send a UTC Date back to RHF
              const utcDate = fromAppTime(time12h, field.value);
              field.onChange(utcDate);
            }}
          />
        );
      }}
    />
  );
}