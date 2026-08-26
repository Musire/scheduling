"use client";

import { MiniMonth } from "../MiniMonth";

interface YearViewProps {
  year: number;
  months: Date[];
  selectedDate: string;
  onSelectMonth: (month: Date) => void;
  onOpenYearSelector: () => void;
}

export function YearView({
  year,
  months,
  selectedDate,
  onSelectMonth,
  onOpenYearSelector,
}: YearViewProps) {
  return (
    <div className="w-full">

      {/* Year selector button */}
      <div className="flex justify-center mb-3">
        <button
          type="button"
          onClick={onOpenYearSelector}
          className="
            text-lg
            font-semibold
            text-else
            hover:text-main
            transition
            cursor-pointer
          "
        >
          {year}
        </button>
      </div>

      {/* Mini months */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {months.map((month) => (
          <button
            key={month.getMonth()}
            type="button"
            onClick={() =>
              onSelectMonth(month)
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
  );
}