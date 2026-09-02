"use client";

import { getWeekRange } from "@/domains/scheduling/utils/weekView";
import { format, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CalendarContextType {
  currentWeekStart: Date;
  setCurrentWeekStart: (date: Date) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedAreaId: string;
  setSelectedAreaId: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read only the week from URL parameters
  const urlWeek = searchParams.get("week");

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    urlWeek ? parseISO(urlWeek) : getWeekRange().startOfWeek
  );
  
  // selectedDate is purely client-side state
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  // selectedAreaId lives in context state only (removed from URL logic)
  const [selectedAreaId, setSelectedAreaId] = useState<string>("all");

  // Automatically sync ONLY week changes to the URL search params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const formattedWeek = format(currentWeekStart, "yyyy-MM-dd");
    params.set("week", formattedWeek);

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    // Only trigger router.replace if the week actually changed
    if (newQueryString !== currentQueryString) {
      router.replace(`?${newQueryString}`, { scroll: false });
    }
  }, [currentWeekStart, router, searchParams]);

  return (
    <CalendarContext.Provider
      value={{
        currentWeekStart,
        setCurrentWeekStart,
        selectedDate,
        setSelectedDate,
        selectedAreaId,
        setSelectedAreaId,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}