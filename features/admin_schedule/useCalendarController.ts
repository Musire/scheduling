"use client";

import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";

import type { CalendarView } from "./components/CalendarHeader";

import {
  getMonday,
  getMonthWeeks,
  getYearMonths,
} from "./CalendarUtils";

import { generateDayTabs } from "@/domains/scheduling/utils/weekView";

interface UseCalendarControllerProps {
  currentWeekStart: Date;
  setCurrentWeekStart: (
    newWeekStart: Date
  ) => void;
  selectedDate: string;
  setSelectedDate: (
    date: string
  ) => void;
}

export function useCalendarController({
  currentWeekStart,
  setCurrentWeekStart,
  selectedDate,
  setSelectedDate,
}: UseCalendarControllerProps) {
  const [view, setView] =
    useState<CalendarView>("week");

  /*
   * viewDate = the month/year currently being browsed
   *
   * selectedDate = the date the user has actually selected
   *
   * These are intentionally separate.
   */
  const [viewDate, setViewDate] = useState<Date>(
    () => new Date(currentWeekStart)
  );

  /*
   * ------------------------------------------------------------------
   * Selected date
   * ------------------------------------------------------------------
   */

  const selectedDateObject = useMemo(
    () => parseISO(selectedDate),
    [selectedDate]
  );

  /*
   * ------------------------------------------------------------------
   * Selected week
   * ------------------------------------------------------------------
   *
   * The selected date is the source of truth for Week View.
   */

  const selectedWeekStart = useMemo(
    () => getMonday(selectedDateObject),
    [selectedDateObject]
  );

  const week = useMemo(
    () =>
      generateDayTabs(
        selectedWeekStart
      ),
    [selectedWeekStart]
  );

  /*
   * ------------------------------------------------------------------
   * Month view
   * ------------------------------------------------------------------
   *
   * Month browsing uses viewDate.
   */

  const monthWeeks = useMemo(
    () => getMonthWeeks(viewDate),
    [viewDate]
  );

  const currentMonth =
    viewDate.getMonth();

  /*
   * ------------------------------------------------------------------
   * Year view
   * ------------------------------------------------------------------
   */

  const year =
    viewDate.getFullYear();

  const months = useMemo(
    () => getYearMonths(year),
    [year]
  );

  /*
   * ------------------------------------------------------------------
   * Header
   * ------------------------------------------------------------------
   *
   * Week View:
   *   selected date determines the header.
   *
   * Month / Year:
   *   browsed viewDate determines the header.
   */

  const monthLabel = useMemo(() => {
    if (view === "week") {
      return format(
        selectedDateObject,
        "MMMM yyyy"
      );
    }

    return format(
      viewDate,
      "MMMM yyyy"
    );
  }, [
    view,
    selectedDateObject,
    viewDate,
  ]);

  /*
   * ------------------------------------------------------------------
   * Select date
   * ------------------------------------------------------------------
   *
   * This is the ONLY operation that changes the actual selection.
   */

  const selectDate = (
    dateString: string
  ) => {
    const date = parseISO(dateString);
    const monday = getMonday(date);

    setSelectedDate(dateString);

    setCurrentWeekStart(monday);

    /*
     * Synchronize browsing position with
     * the newly selected date.
     */
    setViewDate(date);

    /*
     * Selecting a date always returns to Week View.
     */
    setView("week");
  };

  /*
   * ------------------------------------------------------------------
   * Select month
   * ------------------------------------------------------------------
   *
   * Browsing only.
   * Does NOT change selectedDate.
   */

  const selectMonth = (
    month: Date
  ) => {
    const newViewDate = new Date(
      month.getFullYear(),
      month.getMonth(),
      1
    );

    setViewDate(newViewDate);

    setView("month");
  };

  /*
   * ------------------------------------------------------------------
   * Select year
   * ------------------------------------------------------------------
   *
   * Browsing only.
   * Does NOT change selectedDate.
   */

  const selectYear = (
    selectedYear: number
  ) => {
    const newViewDate = new Date(
      selectedYear,
      viewDate.getMonth(),
      1
    );

    setViewDate(newViewDate);

    setView("year");
  };

  /*
   * ------------------------------------------------------------------
   * Year selector
   * ------------------------------------------------------------------
   */

  const openYearSelector = () => {
    setView("year-selector");
  };

  /*
   * ------------------------------------------------------------------
   * Restore selected state
   * ------------------------------------------------------------------
   *
   * Used whenever the user closes the calendar without
   * selecting a new date.
   */

  const restoreSelectedDate = () => {
    const selected = parseISO(selectedDate);
    const monday = getMonday(selected);

    setCurrentWeekStart(monday);

    setViewDate(selected);

    setView("week");
  };

  /*
   * ------------------------------------------------------------------
   * Month button
   * ------------------------------------------------------------------
   */

  const toggleMonthView = () => {
    /*
     * WEEK → MONTH
     */
    if (view === "week") {
      /*
       * Start browsing from the selected date.
       */
      setViewDate(
        parseISO(selectedDate)
      );

      setView("month");

      return;
    }

    /*
     * MONTH / YEAR → WEEK
     *
     * Nothing was selected, so restore
     * the actual selected date.
     */
    restoreSelectedDate();
  };

  /*
   * ------------------------------------------------------------------
   * Year button
   * ------------------------------------------------------------------
   */

  const toggleYearView = () => {
    /*
     * WEEK → YEAR
     */
    if (view === "week") {
      setViewDate(
        parseISO(selectedDate)
      );

      setView("year");

      return;
    }

    /*
     * MONTH → YEAR
     */
    if (view === "month") {
      setView("year");

      return;
    }

    /*
     * YEAR → MONTH
     */
    if (view === "year") {
      setView("month");

      return;
    }

    /*
     * YEAR SELECTOR → YEAR
     */
    if (view === "year-selector") {
      setView("year");
    }
  };

  return {
    /*
     * View state
     */
    view,
    setView,

    /*
     * Selection
     */
    selectedDate,
    selectedDateObject,
    selectedWeekStart,

    /*
     * Browsing
     */
    viewDate,

    /*
     * Week
     */
    week,

    /*
     * Month
     */
    monthWeeks,
    currentMonth,

    /*
     * Year
     */
    year,
    months,

    /*
     * Header
     */
    monthLabel,

    /*
     * Actions
     */
    selectDate,
    selectMonth,
    selectYear,
    openYearSelector,

    toggleMonthView,
    toggleYearView,

    restoreSelectedDate,
  };
}