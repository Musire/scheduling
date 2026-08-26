import { DayTab } from "@/domains/scheduling/utils/weekView";

export function formatDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

export function getMonday(date: Date): Date {
  const result = new Date(date);

  const day = result.getDay();

  // Monday = 0
  // Sunday = 6
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

export function getWeekStartFromDate(
  dateString: string
): Date {
  return getMonday(parseDate(dateString));
}

export function getWeekDates(date: Date): Date[] {
  const monday = getMonday(date);

  return Array.from(
    { length: 7 },
    (_, index) => {
      const day = new Date(monday);

      day.setDate(
        monday.getDate() + index
      );

      return day;
    }
  );
}

export function isSameDate(
  dateA: Date | string,
  dateB: Date | string
): boolean {
  const a =
    typeof dateA === "string"
      ? parseDate(dateA)
      : dateA;

  const b =
    typeof dateB === "string"
      ? parseDate(dateB)
      : dateB;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(
  date: Date | string
): boolean {
  return isSameDate(date, new Date());
}

export function getMonthDays(
  date: Date
): DayTab[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  );

  const lastDay = new Date(
    year,
    month + 1,
    0
  );

  // Monday = 0
  const firstDayOffset =
    (firstDay.getDay() + 6) % 7;

  const daysInMonth =
    lastDay.getDate();

  const totalDays =
    firstDayOffset + daysInMonth;

  const calendarDays =
    Math.ceil(totalDays / 7) * 7;

  return Array.from(
    { length: calendarDays },
    (_, index) => {
      const day = new Date(
        year,
        month,
        1 - firstDayOffset + index
      );

      return {
        dateString: formatDate(day),

        dayName: day.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),

        isToday: isToday(day),
      };
    }
  );
}

export function getMonthWeeks(
  date: Date
): DayTab[][] {
  const days = getMonthDays(date);

  const weeks: DayTab[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

export function getYearMonths(
  year: number
): Date[] {
  return Array.from(
    { length: 12 },
    (_, month) =>
      new Date(year, month, 1)
  );
}