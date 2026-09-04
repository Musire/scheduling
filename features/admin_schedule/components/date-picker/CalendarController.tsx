"use client";

import { useCalendar } from "@/context/CalanderProvider";
import { useCalendarController } from "../../useCalendarController";
import { CalendarHeader } from "./CalendarHeader";
import { MonthView } from "./views/MonthView";
import { WeekView } from "./views/WeekView";
import { YearSelector } from "./views/YearSelector";
import { YearView } from "./views/YearView";

interface Area {
  id: string;
  name: string;
}

interface CalendarControllerProps {
  areas: Area[];
}

export function CalendarController({ areas }: CalendarControllerProps) {
  const {
    currentWeekStart,
    setCurrentWeekStart,
    selectedDate,
    setSelectedDate,
    selectedAreaId,
    setSelectedAreaId,
  } = useCalendar();

  const calendar = useCalendarController({
    currentWeekStart,
    setCurrentWeekStart,
    selectedDate,
    setSelectedDate,
  });

  return (
    <div className="relative flex flex-col items-center space-y-3 w-full max-w-md">
      <CalendarHeader
        monthLabel={calendar.monthLabel}
        view={calendar.view}
        areas={areas}
        selectedArea={selectedAreaId}
        setSelectedArea={setSelectedAreaId}
        onToggleMonth={calendar.toggleMonthView}
        onToggleYear={calendar.toggleYearView}
      />

      {/* Week view stays in normal document flow since it's the default size */}
      {calendar.view === "week" && (
        <WeekView
          week={calendar.week}
          selectedDate={calendar.selectedDate}
          onSelectDate={calendar.selectDate}
        />
      )}

      {/* Larger views are wrapped in an absolute container to act as overlays */}
      {calendar.view !== "week" && (
        <div className="absolute top-full left-0 right-0 z-50 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl mt-2 p-2">
          {calendar.view === "month" && (
            <MonthView
              weeks={calendar.monthWeeks}
              currentMonth={calendar.currentMonth}
              selectedDate={calendar.selectedDate}
              onSelectDate={calendar.selectDate}
            />
          )}

          {calendar.view === "year" && (
            <YearView
              year={calendar.year}
              months={calendar.months}
              selectedDate={calendar.selectedDate}
              onSelectMonth={calendar.selectMonth}
              onOpenYearSelector={calendar.openYearSelector}
            />
          )}

          {calendar.view === "year-selector" && (
            <YearSelector
              year={calendar.year}
              onSelectYear={calendar.selectYear}
            />
          )}
        </div>
      )}
    </div>
  );
}