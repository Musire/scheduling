"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import ControlledInput from "./ControlledInput";

interface RHFDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
}

export default function FormDatePicker({ 
  name, 
  label, 
  placeholder = "Pick a date" 
}: RHFDatePickerProps) {
  return (
    <ControlledInput
      name={name}
      label={label}
      render={(field) => {
        // If field.value exists, parse it into a Date object for the UI
        const dateValue = field.value ? new Date(field.value) : undefined;

        return (
          <Popover>
            <PopoverTrigger>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateValue && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(selectedDate) => {
                  if (!selectedDate) {
                    field.onChange(undefined);
                    return;
                  }

                  // Create a UTC date at midnight based on the selected local year/month/day
                  const utcDateString = new Date(
                    Date.UTC(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth(),
                      selectedDate.getDate()
                    )
                  ).toISOString();

                  field.onChange(utcDateString);
                }}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}