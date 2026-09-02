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

export function CalendarController({
  areas,
}: CalendarControllerProps) {
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
    <div className="flex flex-col items-center space-y-3 w-full max-w-md overflow-hidden">
      <CalendarHeader
        monthLabel={calendar.monthLabel}
        view={calendar.view}
        areas={areas}
        selectedArea={selectedAreaId}
        setSelectedArea={setSelectedAreaId}
        onToggleMonth={
          calendar.toggleMonthView
        }
        onToggleYear={
          calendar.toggleYearView
        }
      />

      {calendar.view === "week" && (
        <WeekView
          week={calendar.week}
          selectedDate={
            calendar.selectedDate
          }
          onSelectDate={
            calendar.selectDate
          }
        />
      )}

      {calendar.view === "month" && (
        <MonthView
          weeks={calendar.monthWeeks}
          currentMonth={
            calendar.currentMonth
          }
          selectedDate={
            calendar.selectedDate
          }
          onSelectDate={
            calendar.selectDate
          }
        />
      )}

      {calendar.view === "year" && (
        <YearView
          year={calendar.year}
          months={calendar.months}
          selectedDate={
            calendar.selectedDate
          }
          onSelectMonth={
            calendar.selectMonth
          }
          onOpenYearSelector={
            calendar.openYearSelector
          }
        />
      )}

      {calendar.view === "year-selector" && (
        <YearSelector
          year={calendar.year}
          onSelectYear={
            calendar.selectYear
          }
        />
      )}
    </div>
  );
}