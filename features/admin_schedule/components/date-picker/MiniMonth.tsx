"use client";

import { getMonthWeeks } from "../../CalendarUtils";

interface DayTab {
  dateString: string;
  dayName: string;
  isToday: boolean;
}

interface MiniMonthProps {
  month: Date;
  selectedDate: string;
}

export function MiniMonth({
  month,
  selectedDate,
}: MiniMonthProps) {
  const weeks = getMonthWeeks(month);

  const currentMonth = month.getMonth();

  const monthName = month.toLocaleDateString(
    "en-US",
    {
      month: "short",
    }
  );

  return (
    <div className="w-full">
      {/* Month name */}
      <div className="mb-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-wide">
          {monthName}
        </span>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map(
          (day, index) => (
            <span
              key={`${day}-${index}`}
              className="
                text-center
                text-[8px]
                font-medium
                opacity-50
              "
            >
              {day}
            </span>
          )
        )}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-0.5">
        {weeks.flat().map((day: DayTab) => {
          const dayMonth =
            Number(day.dateString.split("-")[1]) - 1;

          const isOutsideMonth =
            dayMonth !== currentMonth;

          const isSelected =
            day.dateString === selectedDate;

          return (
            <span
              key={day.dateString}
              className={`
                aspect-square
                flex
                items-center
                justify-center
                rounded
                text-[8px]

                ${
                  isSelected
                    ? "bg-whitesmoke/87 text-black font-bold"
                    : "text-else"
                }

                ${
                  day.isToday
                    ? "ring-1 ring-whitesmoke/60"
                    : ""
                }

                ${
                  isOutsideMonth
                    ? "opacity-20"
                    : "opacity-80"
                }
              `}
            >
              {Number(
                day.dateString.split("-")[2]
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}