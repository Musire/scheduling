"use client";

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
  placeholder = "Pick a date",
}: RHFDatePickerProps) {
  return (
    <ControlledInput
      name={name}
      label={label}
      render={(field) => {
        /*
         * The database stores the selected calendar date
         * as UTC midnight.
         *
         * DO NOT use:
         *
         *   new Date(field.value)
         *
         * because that converts UTC midnight into the
         * browser's local timezone and can move the date
         * backward.
         *
         * Instead, extract the UTC calendar components and
         * create a local Date purely for the Calendar UI.
         */
        const dateValue = field.value
          ? (() => {
              const storedDate = new Date(field.value);

              if (Number.isNaN(storedDate.getTime())) {
                return undefined;
              }

              return new Date(
                storedDate.getUTCFullYear(),
                storedDate.getUTCMonth(),
                storedDate.getUTCDate()
              );
            })()
          : undefined;

        return (
          <Popover>
            <PopoverTrigger>
              <div
                className={cn(
                  "w-full flex items-center normal-space border-border border rounded-lg cursor-pointer justify-start text-left font-normal",
                  !dateValue && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />

                {dateValue ? (
                  format(dateValue, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(selectedDate) => {
                  if (!selectedDate) {
                    field.onChange(undefined);
                    return;
                  }

                  /*
                   * Store the calendar date as UTC midnight.
                   *
                   * The selectedDate itself is only being used
                   * for its year/month/day components.
                   */
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