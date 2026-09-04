"use client";

import { useCalendarState } from "@/hooks/useCalendarState";
import { useScheduleData } from "@/hooks/useScheduleData";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Shift {
  id: string;
  scheduleId: string;
  userId: string;
  areaId: string;
  roleId: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  user: { name: string };
  area: { id: string; name: string };
  role: { name: string };
}

interface CalendarContextType {
  currentWeekStart: Date;
  setCurrentWeekStart: (date: Date) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedAreaId: string;
  setSelectedAreaId: (id: string) => void;
  filteredShifts: Shift[];
  isPending: boolean;
  setScheduleId: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: React.ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps) {
  const calendar = useCalendarState();
  const [scheduleId, setScheduleId] = useState<string | undefined | null>(null);
  const { filteredShifts, isPending } = useScheduleData(
    calendar.currentWeekStart,
    calendar.selectedDate,
    calendar.selectedAreaId,
    scheduleId
  );

  return (
    <CalendarContext.Provider
      value={{
        ...calendar,
        filteredShifts,
        isPending,
        setScheduleId
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(scheduleId?: string | null) {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  useEffect(() => {
    if (!!scheduleId) {
      context.setScheduleId(scheduleId);
    }
  }, [scheduleId, context]);

  return context;
}