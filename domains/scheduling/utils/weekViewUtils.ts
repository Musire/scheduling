import  { dayjs, Dayjs } from "@/lib/dayjs"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Extend dayjs with required plugins
dayjs.extend(isSameOrBefore);

export interface WeekRange {
  startOfWeek: Dayjs;
  endOfWeek: Dayjs;
  formattedRange: string; // e.g., "aug 24 - aug 30"
}

export interface DayTab {
  dayName: string; // e.g., "mon", "tue"
  dateString: string; // e.g., "2026-08-24" (safe for state/comparison)
  isToday: boolean;
}

/**
 * Calculates the start, end, and formatted text string for a given target date's week.
 * @param targetDate Any date within the week you want to calculate
 */
export const getWeekRange = (targetDate: string | Date | Dayjs = dayjs()): WeekRange => {
  const date = dayjs(targetDate);
  // Set Monday as start of week (1) to match your UI sequence
  const startOfWeek = date.startOf('week').add(1, 'day'); 
  const endOfWeek = startOfWeek.add(6, 'day');

  // Formats to lowercase "MMM DD" to match your UI style (e.g., "aug 24")
  const startFormatted = startOfWeek.format('MMM DD').toLowerCase();
  const endFormatted = endOfWeek.format('MMM DD').toLowerCase();

  return {
    startOfWeek,
    endOfWeek,
    formattedRange: `${startFormatted} - ${endFormatted}`,
  };
};

/**
 * Navigates the week range backward or forward.
 * @param currentStart The start of the currently viewed week
 * @param direction 'prev' to go back 1 week, 'next' to go forward 1 week
 */
export const navigateWeek = (currentStart: Dayjs, direction: 'prev' | 'next'): WeekRange => {
  const nextTarget = direction === 'next' 
    ? currentStart.add(7, 'days') 
    : currentStart.subtract(7, 'days');
    
  return getWeekRange(nextTarget);
};

/**
 * Generates the 7 daily tabs for the top navigation bar based on a starting Monday.
 * @param startOfWeek The Monday Dayjs object of the target week
 */
export const generateDayTabs = (startOfWeek: Dayjs): DayTab[] => {
  const tabs: DayTab[] = [];
  const todayStr = dayjs().format('YYYY-MM-DD');

  for (let i = 0; i < 7; i++) {
    const currentDay = startOfWeek.add(i, 'day');
    tabs.push({
      dayName: currentDay.format('ddd').toLowerCase(), // "mon", "tue", etc.
      dateString: currentDay.format('YYYY-MM-DD'),     // Machine readable state key
      isToday: currentDay.format('YYYY-MM-DD') === todayStr,
    });
  }

  return tabs;
};
