import {
  addDays,
  addWeeks,
  format,
  isToday,
  startOfWeek,
} from "date-fns";

export interface WeekRange {
  startOfWeek: Date;
  endOfWeek: Date;
  formattedRange: string; // e.g. "aug 24 - aug 30"
}

export interface DayTab {
  dayName: string; // e.g. "mon", "tue"
  dateString: string; // e.g. "2026-08-24"
  isToday: boolean;
}

/**
 * Calculates the start, end, and formatted text string
 * for a given target date's week.
 *
 * Monday is used as the first day of the week.
 */
export const getWeekRange = (
  targetDate: string | Date = new Date()
): WeekRange => {
  const date = new Date(targetDate);

  const start = startOfWeek(date, {
    weekStartsOn: 1,
  });

  const end = addDays(start, 6);

  const startFormatted = format(start, "MMM dd").toLowerCase();
  const endFormatted = format(end, "MMM dd").toLowerCase();

  return {
    startOfWeek: start,
    endOfWeek: end,
    formattedRange: `${startFormatted} - ${endFormatted}`,
  };
};

/**
 * Navigates the week range backward or forward.
 */
export const navigateWeek = (
  currentStart: Date,
  direction: "prev" | "next"
): WeekRange => {
  const nextTarget =
    direction === "next"
      ? addWeeks(currentStart, 1)
      : addWeeks(currentStart, -1);

  return getWeekRange(nextTarget);
};

/**
 * Generates the 7 daily tabs based on a starting Monday.
 */
export const generateDayTabs = (startOfWeek: Date): DayTab[] => {
  const tabs: DayTab[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = addDays(startOfWeek, i);

    tabs.push({
      dayName: format(currentDay, "EEE").toLowerCase(),
      dateString: format(currentDay, "yyyy-MM-dd"),
      isToday: isToday(currentDay),
    });
  }

  return tabs;
};