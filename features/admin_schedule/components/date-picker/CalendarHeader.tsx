"use client";

import {
  CalendarDays,
  CalendarRange,
  ChevronDown,
} from "lucide-react";

export type CalendarView =
  | "week"
  | "month"
  | "year"
  | "year-selector";

interface Area {
  id: string;
  name: string;
}

interface CalendarHeaderProps {
  monthLabel: string;
  view: CalendarView;

  areas: Area[];
  selectedArea: string;
  setSelectedArea: (areaId: string) => void;

  onToggleMonth: () => void;
  onToggleYear: () => void;
}

export function CalendarHeader({
  monthLabel,
  view,
  areas,
  selectedArea,
  setSelectedArea,
  onToggleMonth,
  onToggleYear,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      {/* Area Filter */}
      <div className="relative">
        <select
          value={selectedArea}
          onChange={(event) =>
            setSelectedArea(event.target.value)
          }
          className="
            appearance-none
            bg-transparent
            text-sm
            font-medium
            text-else
            border
            border-whitesmoke/15
            rounded
            pl-3
            pr-8
            py-2
            outline-none
            cursor-pointer
            transition
            hover:bg-lighten-1/background
            focus:border-whitesmoke/40
          "
        >
          <option value="all">
            All Areas
          </option>

          {areas.map((area) => (
            <option
              key={area.id}
              value={area.id}
            >
              {area.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="
            pointer-events-none
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            opacity-60
          "
        />
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center gap-1">
        <span className="mr-1 text-sm font-medium capitalize text-else">
          {monthLabel}
        </span>

        {/* Month */}
        <button
          type="button"
          onClick={onToggleMonth}
          className={`
            flex
            items-center
            justify-center
            p-2
            rounded
            transition
            cursor-pointer
            ${
              view === "month"
                ? "bg-whitesmoke/87 text-black"
                : "text-else hover:bg-lighten-1/background"
            }
          `}
          aria-label="Toggle month view"
        >
          <CalendarDays
            size={20}
            strokeWidth={1.8}
          />
        </button>

        {/* Year */}
        <button
          type="button"
          onClick={onToggleYear}
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
                : "text-else hover:bg-lighten-1/background"
            }
          `}
          aria-label="Toggle year view"
        >
          <CalendarRange
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  );
}