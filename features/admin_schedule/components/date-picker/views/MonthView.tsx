"use client";

import { CalendarDayButton } from "../CalendarDayButton";

interface DayTab {
  dateString: string;
  dayName: string;
  isToday: boolean;
}

interface MonthViewProps {
  weeks: DayTab[][];
  currentMonth: number;
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
}

export function MonthView({
  weeks,
  currentMonth,
  selectedDate,
  onSelectDate,
}: MonthViewProps) {
  return (
    <div className="w-full">

      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-2 mb-2 w-full">
        {[
          "mon",
          "tue",
          "wed",
          "thu",
          "fri",
          "sat",
          "sun",
        ].map((day) => (
          <div
            key={day}
            className="
              text-center
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-else
              opacity-70
              py-1
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {weeks.flat().map((day) => {
          const dayMonth =
            Number(
              day.dateString.split("-")[1]
            ) - 1;

          const isOutsideMonth =
            dayMonth !== currentMonth;

          return (
            <CalendarDayButton
              key={day.dateString}
              dateString={day.dateString}
              isToday={day.isToday}
              isSelected={
                selectedDate === day.dateString
              }
              isOutsideMonth={
                isOutsideMonth
              }
              showDayName={false}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}