"use client";

import {
  CalendarDays,
  CalendarRange
} from "lucide-react";
import { useMemo, useState } from "react";

import { generateDayTabs } from "../utils/weekView";

interface CalendarControllerProps {
  currentWeekStart: Date;
  setCurrentWeekStart: (newWeekStart: Date) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

type CalendarView = "week" | "month" | "year";

interface DayTab {
  dateString: string;
  dayName: string;
  isToday: boolean;
}

/* -------------------------------------------------------------------------- */
/* Date Helpers                                                               */
/* -------------------------------------------------------------------------- */

function getDateFromString(dateString: string): Date {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getMonday(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

/* -------------------------------------------------------------------------- */
/* Month Generation                                                           */
/* -------------------------------------------------------------------------- */

function getMonthWeeks(date: Date): DayTab[][] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Monday = 0 ... Sunday = 6
  const firstDayOffset =
    (firstDayOfMonth.getDay() + 6) % 7;

  const daysInMonth = lastDayOfMonth.getDate();

  const totalDays =
    firstDayOffset + daysInMonth;

  const totalCalendarDays =
    Math.ceil(totalDays / 7) * 7;

  const today = new Date();

  const days: DayTab[] = [];

  for (let i = 0; i < totalCalendarDays; i++) {
    const day = new Date(
      year,
      month,
      1 - firstDayOffset + i
    );

    const dateString = formatDate(day);

    const isToday =
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate();

    const dayName = day.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
      }
    );

    days.push({
      dateString,
      dayName,
      isToday,
    });
  }

  const weeks: DayTab[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
}

function getYearMonths(year: number): Date[] {
  return Array.from(
    { length: 12 },
    (_, month) => new Date(year, month, 1)
  );
}

/* -------------------------------------------------------------------------- */
/* Day Button                                                                 */
/* -------------------------------------------------------------------------- */

interface DayButtonProps {
  tab: DayTab;
  selectedDate: string;
  onSelect: (date: string) => void;
  month?: number;
  showDayName?: boolean;
}

function DayButton({
  tab,
  selectedDate,
  onSelect,
  month,
  showDayName = true,
}: DayButtonProps) {
  /*
   * IMPORTANT:
   *
   * This compares the exact date.
   *
   * If selectedDate is:
   *
   * 2026-03-12
   *
   * then ONLY the March 12 button is active.
   */
  const isSelected =
    selectedDate === tab.dateString;

  const dayMonth =
    Number(tab.dateString.split("-")[1]) - 1;

  const isOutsideMonth =
    month !== undefined &&
    dayMonth !== month;

  return (
    <button
      type="button"
      onClick={() => onSelect(tab.dateString)}
      className={`
        relative
        w-full
        min-w-0
        py-2
        text-sm
        rounded
        font-medium
        transition
        flex
        flex-col
        items-center
        justify-center
        gap-0.5
        cursor-pointer
        border
        border-whitesmoke/15

        ${
          isSelected
            ? "bg-whitesmoke/87 text-black font-bold"
            : "text-else hover:bg-lighten-1/background"
        }

        ${
          tab.isToday && !isSelected
            ? "ring-1 ring-whitesmoke/60"
            : ""
        }

        ${
          tab.isToday && isSelected
            ? "ring-2 ring-whitesmoke/70"
            : ""
        }

        ${
          isOutsideMonth
            ? "opacity-35"
            : ""
        }
      `}
    >
      {showDayName && (
        <span className="text-xs opacity-80 capitalize">
          {tab.dayName}
        </span>
      )}

      <span className="text-base font-semibold">
        {tab.dateString.split("-")[2]}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Mini Month                                                                 */
/* -------------------------------------------------------------------------- */

function MiniMonth({
  month,
  selectedDate,
}: {
  month: Date;
  selectedDate: string;
}) {
  const weeks = useMemo(
    () => getMonthWeeks(month),
    [month]
  );

  const monthIndex = month.getMonth();

  return (
    <div className="w-full">
      <div className="text-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide">
          {month.toLocaleDateString("en-US", {
            month: "short",
          })}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map(
          (day, index) => (
            <span
              key={`${day}-${index}`}
              className="text-center text-[8px] opacity-50"
            >
              {day}
            </span>
          )
        )}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {weeks.flat().map((day) => {
          const dayMonth =
            Number(
              day.dateString.split("-")[1]
            ) - 1;

          const isOutsideMonth =
            dayMonth !== monthIndex;

          const isSelected =
            day.dateString === selectedDate;

          return (
            <span
              key={day.dateString}
              className={`
                flex
                items-center
                justify-center
                aspect-square
                rounded
                text-[8px]

                ${
                  isSelected
                    ? "bg-whitesmoke/87 text-black font-bold"
                    : ""
                }

                ${
                  day.isToday && !isSelected
                    ? "ring-1 ring-whitesmoke/60"
                    : ""
                }

                ${
                  day.isToday && isSelected
                    ? "ring-2 ring-whitesmoke/70"
                    : ""
                }

                ${
                  isOutsideMonth
                    ? "opacity-20"
                    : "opacity-80"
                }
              `}
            >
              {Number(
                day.dateString.split("-")[2]
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function CalendarController({
  currentWeekStart,
  setCurrentWeekStart,
  selectedDate,
  setSelectedDate,
}: CalendarControllerProps) {
  const [view, setView] =
    useState<CalendarView>("week");

  /* ------------------------------------------------------------------------ */
  /* Selected Week                                                            */
  /* ------------------------------------------------------------------------ */

  /*
   * selectedDate remains the ACTUAL selected date.
   *
   * Example:
   *
   * selectedDate = "2026-03-12"
   *
   * selectedWeekStart = Monday "2026-03-09"
   */
  const selectedWeekStart = useMemo(() => {
    return getMonday(
      getDateFromString(selectedDate)
    );
  }, [selectedDate]);

  /*
   * The week displayed is determined by the
   * selected date, but the selected date itself
   * remains unchanged.
   */
  const weekTabs = useMemo(
    () => generateDayTabs(selectedWeekStart),
    [selectedWeekStart]
  );

  /* ------------------------------------------------------------------------ */
  /* Month / Year                                                             */
  /* ------------------------------------------------------------------------ */

  const monthWeeks = useMemo(
    () => getMonthWeeks(currentWeekStart),
    [currentWeekStart]
  );

  const currentMonth =
    currentWeekStart.getMonth();

  const year =
    currentWeekStart.getFullYear();

  const months = useMemo(
    () => getYearMonths(year),
    [year]
  );

  /* ------------------------------------------------------------------------ */
  /* Header                                                                   */
  /* ------------------------------------------------------------------------ */

  const monthLabel =
    selectedWeekStart.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  /* ------------------------------------------------------------------------ */
  /* Select Date                                                              */
  /* ------------------------------------------------------------------------ */

  const handleDateSelect = (
    dateString: string
  ) => {
    /*
     * THIS IS THE IMPORTANT PART.
     *
     * Keep the exact date that was clicked.
     *
     * Do NOT replace it with Monday.
     */
    setSelectedDate(dateString);

    /*
     * Separately calculate Monday so that the
     * correct week is displayed.
     */
    const date =
      getDateFromString(dateString);

    const monday =
      getMonday(date);

    setCurrentWeekStart(monday);
  };

  /* ------------------------------------------------------------------------ */
  /* Select Month                                                             */
  /* ------------------------------------------------------------------------ */

  const handleMonthSelect = (
    month: Date
  ) => {
    const firstDay = new Date(
      month.getFullYear(),
      month.getMonth(),
      1
    );

    setCurrentWeekStart(firstDay);

    setView("month");
  };

  return (
    <div className="flex flex-col items-center space-y-3 w-full max-w-md overflow-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex items-center justify-end w-full gap-1">

        {/* Month Name */}
        <span className="mr-1 text-sm font-medium capitalize text-else">
          {monthLabel}
        </span>

        {/* Calendar / Week-Month */}
        <button
          type="button"
          onClick={() =>
            setView((current) =>
              current === "week"
                ? "month"
                : "week"
            )
          }
          className={`
            flex
            items-center
            justify-center
            p-2
            rounded
            transition
            cursor-pointer

            ${
              view !== "week"
                ? "bg-whitesmoke/87 text-black"
                : "text-else hover:bg-lighten-1/background hover:text-main"
            }
          `}
          aria-label={
            view === "week"
              ? "Show month view"
              : "Show week view"
          }
        >
          <CalendarDays
            size={20}
            strokeWidth={1.8}
          />
        </button>

        {/* Calendar / Year */}
        <button
          type="button"
          onClick={() =>
            setView((current) =>
              current === "year"
                ? "month"
                : "year"
            )
          }
          className={`
            flex
            items-center
            justify-center
            p-2
            rounded
            transition
            cursor-pointer

            ${
              view === "year"
                ? "bg-whitesmoke/87 text-black"
                : "text-else hover:bg-lighten-1/background hover:text-main"
            }
          `}
          aria-label={
            view === "year"
              ? "Show month view"
              : "Show year view"
          }
        >
          <CalendarRange
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* WEEK VIEW                                                           */}
      {/* ------------------------------------------------------------------ */}

      {view === "week" && (
        <div className="w-full">
          <div className="grid grid-cols-7 gap-2 w-full">
            {weekTabs.map((tab) => (
              <DayButton
                key={tab.dateString}
                tab={tab}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
                showDayName
              />
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MONTH VIEW                                                          */}
      {/* ------------------------------------------------------------------ */}

      {view === "month" && (
        <div className="w-full">

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-2 mb-2 w-full">
            {[
              "mon",
              "tue",
              "wed",
              "thu",
              "fri",
              "sat",
              "sun",
            ].map((day) => (
              <div
                key={day}
                className="
                  text-center
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-else
                  opacity-70
                  py-1
                "
              >
                {day}
              </div>
            ))}
          </div>

          {/* Month Days */}
          <div className="grid grid-cols-7 gap-2 w-full">
            {monthWeeks.flat().map((tab) => (
              <DayButton
                key={tab.dateString}
                tab={tab}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
                month={currentMonth}
                showDayName={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* YEAR VIEW                                                           */}
      {/* ------------------------------------------------------------------ */}

      {view === "year" && (
        <div className="w-full">

          {/* Year */}
          <div className="text-center mb-3">
            <span className="text-sm font-semibold">
              {year}
            </span>
          </div>

          {/* Months */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {months.map((month) => (
              <button
                key={month.getMonth()}
                type="button"
                onClick={() =>
                  handleMonthSelect(month)
                }
                className="
                  w-full
                  rounded
                  border
                  border-whitesmoke/15
                  p-2
                  text-else
                  hover:bg-lighten-1/background
                  transition
                  cursor-pointer
                "
              >
                <MiniMonth
                  month={month}
                  selectedDate={selectedDate}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}