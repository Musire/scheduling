"use client";

import { getWeekRange } from "@/domains/scheduling/utils/weekView";
import { format, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useCalendarState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlWeek = searchParams.get("week");

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    urlWeek ? parseISO(urlWeek) : getWeekRange().startOfWeek
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedAreaId, setSelectedAreaId] = useState<string>("all");

  useEffect(() => {
    const formattedWeek = format(currentWeekStart, "yyyy-MM-dd");
    
    // Only update if the URL doesn't already match the current week
    if (urlWeek !== formattedWeek) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("week", formattedWeek);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [currentWeekStart, urlWeek]);

  return {
    currentWeekStart,
    setCurrentWeekStart,
    selectedDate,
    setSelectedDate,
    selectedAreaId,
    setSelectedAreaId,
  };
}