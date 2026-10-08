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
  toZonedTime,
} from "date-fns-tz";

export const APP_TIMEZONE = "America/Chicago";

/* =========================================================
             Time Conversion Helpers
   ========================================================= */


export const toAppTime = (
  dbValue?: string | Date
): string => {
  if (!dbValue) return "";

  // Full Date object / UTC timestamp
  if (dbValue instanceof Date) {
    if (!isValid(dbValue)) return "";

    const zonedDate = toZonedTime(
      dbValue,
      APP_TIMEZONE
    );

    return format(zonedDate, "h:mm a");
  }

  // Raw 24-hour time string such as "17:27:00"
  // or "17:27". These have no timezone information,
  // so they are already assumed to be application time.
  const parsed24h = parse(
    dbValue,
    "HH:mm:ss",
    new Date()
  );

  if (isValid(parsed24h)) {
    return format(parsed24h, "h:mm a");
  }

  const parsedShort24h = parse(
    dbValue,
    "HH:mm",
    new Date()
  );

  if (isValid(parsedShort24h)) {
    return format(parsedShort24h, "h:mm a");
  }

  // Full ISO / UTC datetime
  const fallbackDate = new Date(dbValue);

  if (isValid(fallbackDate)) {
    const zonedDate = toZonedTime(
      fallbackDate,
      APP_TIMEZONE
    );

    return format(zonedDate, "h:mm a");
  }

  return "";
};



export const fromAppTime = (
  time12h: string,
  existingValue?: Date | string,
  targetTimeZone: string = APP_TIMEZONE
): string => {
  if (!time12h) return "";

  const parsedTime = parse(
    time12h,
    "h:mm a",
    new Date()
  );

  if (!isValid(parsedTime)) {
    return "";
  }

  const hours = parsedTime.getHours();
  const minutes = parsedTime.getMinutes();

  /*
   * Determine the calendar date.
   *
   * IMPORTANT:
   * The date is a calendar date belonging to the application,
   * not the browser's local timezone.
   */
  let year: number;
  let month: number;
  let day: number;

  if (existingValue) {
    const baseDate =
      existingValue instanceof Date
        ? existingValue
        : new Date(existingValue);

    if (!isValid(baseDate)) {
      return "";
    }

    /*
     * If the supplied value is an ISO/UTC timestamp,
     * extract its UTC calendar components.
     *
     * This prevents the browser timezone from changing
     * the shift date.
     */
    year = baseDate.getUTCFullYear();
    month = baseDate.getUTCMonth() + 1;
    day = baseDate.getUTCDate();
  } else {
    /*
     * No existing date: use today's date in Chicago.
     */
    const nowChicago = toZonedTime(
      new Date(),
      targetTimeZone
    );

    year = nowChicago.getFullYear();
    month = nowChicago.getMonth() + 1;
    day = nowChicago.getDate();
  }

  const wallClockString =
    `${year}-${String(month).padStart(2, "0")}-` +
    `${String(day).padStart(2, "0")}T` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:00`;

  /*
   * Interpret the wall-clock time as America/Chicago,
   * then convert that instant to UTC.
   *
   * date-fns-tz handles CST/CDT automatically.
   */
  const utcDate = fromZonedTime(
    wallClockString,
    targetTimeZone
  );

  return utcDate.toISOString();
};


export const toTimePicker = (
  dbValue?: string | Date,
  targetTimeZone: string = APP_TIMEZONE
): string => {
  if (!dbValue) return "";

  let utcDate: Date;

  if (dbValue instanceof Date) {
    utcDate = dbValue;
  } else {
    /*
     * Full ISO / UTC timestamp.
     */
    const parsedTimestamp = Date.parse(dbValue);

    if (!Number.isNaN(parsedTimestamp)) {
      utcDate = new Date(parsedTimestamp);
    } else {
      /*
       * Raw 24-hour strings have no timezone.
       * Treat them as already being America/Chicago time.
       */
      const parsed = parse(
        dbValue,
        "HH:mm:ss",
        new Date()
      );

      const parsedShort = parse(
        dbValue,
        "HH:mm",
        new Date()
      );

      const localDate = isValid(parsed)
        ? parsed
        : parsedShort;

      if (!isValid(localDate)) {
        return "";
      }

      return format(localDate, "h:mm a");
    }
  }

  if (!isValid(utcDate)) {
    return "";
  }

  /*
   * UTC instant → America/Chicago wall-clock time.
   */
  const zonedDate = toZonedTime(
    utcDate,
    targetTimeZone
  );

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

export function formatToAppTime(startsAt: string, endsAt: string): string {
  const startTime = toAppTime(startsAt);
  const endTime = toAppTime(endsAt);

  return `${startTime} - ${endTime}`;
}

export function getShiftDuration(isoString1: string, isoString2: string) {
  const date1 = parseISO(isoString1);
  const date2 = parseISO(isoString2);
  
  // Get total difference in minutes (absolute value handles any argument order)
  const diffMins = Math.abs(differenceInMinutes(date1, date2));
  
  // Under 60 minutes -> show minutes
  if (diffMins < 60) {
    return `${diffMins} mins`;
  }
  
  // 60 minutes or more -> convert to hours and round to 1 decimal place
  const diffHours = Math.round((diffMins / 60) * 10) / 10;
  const unit = diffHours === 1 ? 'hr' : 'hrs';
  
  return `${diffHours}${unit}`;
}


export const createDenverCityTimestamp = (): string => {
  return formatInTimeZone(
    new Date(), 
    APP_TIMEZONE, 
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );
};

export const toUtcMidnight = (dateInput: Date | string | number) => {
    const d = new Date(dateInput);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
};