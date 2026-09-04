/* =========================================================
             Date-Fns Configuration & Timezone Helpers
   ========================================================= */
import {
  addDays,
  addWeeks,
  differenceInMinutes,
  format,
  isValid,
  parse,
  parseISO,
  set,
  startOfWeek
} from "date-fns";
import {
  formatInTimeZone,
  fromZonedTime,
  toZonedTime
} from "date-fns-tz";

export const APP_TIMEZONE = "America/Chicago";

/* =========================================================
             Time Conversion Helpers
   ========================================================= */

/**
 * Converts a standard Date object or string into a zoned Date instance 
 * set to the application's default timezone.
 */

export const toAppTime = (dbValue?: string | Date): string => {
  if (!dbValue) return "";

  // If it's already a Date object
  if (dbValue instanceof Date) {
    return isValid(dbValue) ? format(dbValue, "h:mm a") : "";
  }

  // If it's stored as a 24h time string (e.g., "17:27:00" or "17:27")
  const parsed24h = parse(dbValue, "HH:mm:ss", new Date());
  if (isValid(parsed24h)) {
    return format(parsed24h, "h:mm a");
  }

  const parsedShort24h = parse(dbValue, "HH:mm", new Date());
  if (isValid(parsedShort24h)) {
    return format(parsedShort24h, "h:mm a");
  }

  // Fallback: try parsing as a full ISO/datetime string
  const fallbackDate = new Date(dbValue);
  if (isValid(fallbackDate)) {
    return format(fallbackDate, "h:mm a");
  }

  return "";
};

/**
 * Converts a zoned Date instance back into a standard JavaScript Date object 
 * representing the exact UTC instant.
 */

export const fromAppTime = (
  time12h: string, 
  existingValue?: Date | string,
  targetTimeZone: string = "America/Chicago"
): string => {
  const parsedTime = parse(time12h, "h:mm a", new Date());
  const hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();

  // Get the base YYYY-MM-DD from the existing value or today
  const baseDate = existingValue ? new Date(existingValue) : new Date();
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
  const day = String(baseDate.getDate()).padStart(2, "0");

  // Construct a strict wall-clock ISO string for the target zone
  const wallClockString = `${year}-${month}-${day}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;

  // Explicitly treat this string as local time in America/Chicago and get the true UTC date
  const utcDate = fromZonedTime(wallClockString, targetTimeZone);

  return utcDate.toISOString();
};


export const toTimePicker = (
  dbValue?: string | Date, 
  targetTimeZone: string = "America/Chicago"
): string => {
  if (!dbValue) return "";

  let utcDate: Date;

  if (dbValue instanceof Date) {
    utcDate = dbValue;
  } else {
    // Standardize database/ISO string parsing
    const parsedTimestamp = Date.parse(dbValue);
    if (!isNaN(parsedTimestamp)) {
      utcDate = new Date(dbValue);
    } else {
      // Handle raw 24h strings without timezone context
      const parsed = parse(dbValue, "HH:mm:ss", new Date());
      const parsedShort = parse(dbValue, "HH:mm", new Date());
      const localDate = isValid(parsed) ? parsed : parsedShort;
      
      if (!isValid(localDate)) return "";
      
      // If it's a raw 24h string, assume it's already in Chicago time
      return format(localDate, "h:mm a"); 
    }
  }

  if (!isValid(utcDate)) return "";

  // CRITICAL FIX: Convert the absolute UTC time to Chicago's wall-clock time
  const zonedDate = toZonedTime(utcDate, targetTimeZone);

  // Return the AM/PM string format your TimePicker expects
  return format(zonedDate, "h:mm a");
};


export const getNow = (targetTimeZone: string = "America/Chicago"): string => {
  // 1. Get the real-world current system date and time
  const now = new Date();

  // 2. Construct a precise wall-clock string matching current Chicago time
  const year = now.toLocaleDateString("en-US", { timeZone: targetTimeZone, year: "numeric" });
  const month = now.toLocaleDateString("en-US", { timeZone: targetTimeZone, month: "2-digit" });
  const day = now.toLocaleDateString("en-US", { timeZone: targetTimeZone, day: "2-digit" });
  const time = now.toLocaleTimeString("en-US", { timeZone: targetTimeZone, hour12: false });

  const wallClockString = `${year}-${month}-${day}T${time}`;

  // 3. Convert that exact local timestamp into a true UTC ISO string
  const utcDate = fromZonedTime(wallClockString, targetTimeZone);

  return utcDate.toISOString();
};

/* =========================================================
             Date Calculation Helpers
   ========================================================= */

/**
 * Represents the starting benchmark for the current week (Monday). 
 * (Shifts the standard Sunday start by +1 day).
 */
export const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

/**
 * Calculates a specific JavaScript Date object relative to the weekStart base 
 * by offsetting days, hours, and minutes, with seconds and milliseconds zeroed out.
 */
export const weekDate = (day: number, hour: number, minute = 0): Date => {
  const targetDay = addDays(weekStart, day);
  return set(targetDay, {
    hours: hour,
    minutes: minute,
    seconds: 0,
    milliseconds: 0,
  });
};

/* =========================================================
             Formatting Utilities
   ========================================================= */

/**
 * Splits a Date instance into separate formatted date and time strings 
 * using the application's timezone.
 * 
 * @returns An object containing:
 * - dateString: e.g., "jan 01, 2026 (thu)" (lowercased)
 * - timeString: e.g., "12:00 PM"
 */
export const formatAppTimeSplit = (value: Date) => {
  return {
    dateString: formatInTimeZone(value, APP_TIMEZONE, "MMM dd, yyyy (eee)").toLowerCase(),
    timeString: formatInTimeZone(value, APP_TIMEZONE, "h:mm a"),
  };
};

/* =========================================================
             Parsing Utilities
   ========================================================= */

/**
 * Parses a 12-hour time string (e.g., "02:30 PM") into a 24-hour format string (e.g., "14:30").
 */
export function parseTo24H(timeString: string): string {
  const parsed = parse(timeString, "h:mm a", new Date());
  return format(parsed, "HH:mm");
}

/**
 * Takes a 12-hour time string (e.g., "4:30 PM") and an existing date value,
 * merges them in the app's timezone, and returns a UTC Date object for Prisma.
 */

export function isHourAfter(startIso: string, endIso: string): boolean {
  if (!startIso || !endIso) return false;

  const start = parseISO(startIso);
  const end = parseISO(endIso);

  // Guard against malformed date strings
  if (!isValid(start) || !isValid(end)) return false;

  // differenceInMinutes(laterDate, earlierDate)
  return differenceInMinutes(end, start) >= 59;
}

/**
 * Dynamically gets the current week's Monday formatted as YYYY-MM-DD.
 * Safe to use inside Next.js Server Components.
 */
export const getCurrentWeekString = (): string => {
  const currentMonday = startOfWeek(new Date(), { weekStartsOn: 1 });
  return format(currentMonday, "yyyy-MM-dd");
};


export function getWeekRange(): string[] {
  const weeks: string[] = [];
  const today = new Date();

  const currentMonday = startOfWeek(today, { weekStartsOn: 1 });

  for (let i = -5; i <= 5; i++) {
    const targetMonday = addWeeks(currentMonday, i);
    const formattedWeek = format(targetMonday, 'yyyy-MM-dd');
    weeks.push(formattedWeek);
  }

  return weeks;
}

export function getWeekLimits(weekStart: string): Date[] {
  const startDate = parseISO(weekStart);
  const endDate = addDays(startDate, 6);

  return [startDate, endDate]

}