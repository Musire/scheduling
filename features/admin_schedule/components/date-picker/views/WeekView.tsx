"use client";

import { CalendarDayButton } from "../CalendarDayButton";

interface DayTab {
  dateString: string;
  dayName: string;
  isToday: boolean;
}

interface WeekViewProps {
  week: DayTab[];
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
}

export function WeekView({
  week,
  selectedDate,
  onSelectDate,
}: WeekViewProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 w-full py-1">
        {week.map((day) => (
          <CalendarDayButton
            key={day.dateString}
            dateString={day.dateString}
            dayName={day.dayName}
            isToday={day.isToday}
            isSelected={
              selectedDate === day.dateString
            }
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}