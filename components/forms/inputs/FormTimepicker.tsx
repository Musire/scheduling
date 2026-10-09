"use client";

import { toInteger, toMeridiem } from "@/lib/utils/timeConversion";
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
        return (
          <TimePicker
            interval={15}
            value={toMeridiem(field.value)}
            onChange={(meridiem) => {
              if (!meridiem) {
                field.onChange("");
                return;
              }

              field.onChange(toInteger(meridiem))
            }}
          />
        );
      }}
    />
  );
}
