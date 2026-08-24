/* =========================================================
             Dayjs Configuration & Plugins
   ========================================================= */
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Extend Dayjs with required functionality for parsing, UTC, and timezones
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = "America/Chihuahua";
dayjs.tz.setDefault(APP_TIMEZONE);

export { dayjs, Dayjs };

/* =========================================================
             Time Conversion Helpers
   ========================================================= */

/**
 * Converts a standard Date object or string into a Dayjs instance 
 * set to the application's default timezone.
 */
export const toAppTime = (value: Date | string) => dayjs(value).tz();

/**
 * Converts a Dayjs instance back into a standard JavaScript Date object.
 */
export const fromAppTime = (value: Dayjs) => value.toDate();


/* =========================================================
             Date Calculation Helpers
   ========================================================= */

/**
 * Represents the starting benchmark for the current week. 
 * Defaults to the start of the week plus 1 day (typically shifting it to Monday depending on locale).
 */
export const weekStart = dayjs().startOf('week').add(1, 'day');

/**
 * Calculates a specific JavaScript Date object relative to the weekStart base 
 * by offsetting days, hours, and minutes, with seconds and milliseconds zeroed out.
 */
export const weekDate = (day: number, hour: number, minute = 0) =>
  weekStart.add(day, 'day').hour(hour).minute(minute).second(0).millisecond(0).toDate();

/* =========================================================
             Formatting Utilities
   ========================================================= */

/**
 * Splits a Dayjs instance into separate formatted date and time strings.
 * 
 * @returns An object containing:
 * - dateString: e.g., "jan 01, 2026 (thu)" (lowercased)
 * - timeString: e.g., "12:00 PM"
 */
export const formatAppTimeSplit = (value: Dayjs) => {
  return {
    dateString: value.format("MMM DD, YYYY (ddd)").toLowerCase(), 
    timeString: value.format("h:mm A")
  };
};

/* =========================================================
             Parsing Utilities
   ========================================================= */

/**
 * Parses a 12-hour time string (e.g., "02:30 PM") into a 24-hour format string (e.g., "14:30").
 * 
 * /* Note: Assumes standard formatting with a space separating the time and AM/PM modifier. */
export function parseTo24H(timeString: string): string {
  const [timePart, modifier] = timeString.split(" ");
  const [hoursStr, minutes] = timePart.split(":") ?? ["0", "0"];
  let hours = hoursStr;

  const isPM = modifier?.toLowerCase() === "pm";
  const isAM = modifier?.toLowerCase() === "am";

  if (isPM && hours !== "12") {
    hours = String(Number(hours) + 12);
  } else if (isAM && hours === "12") {
    hours = "00";
  }

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}
