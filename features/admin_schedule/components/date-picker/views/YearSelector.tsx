"use client";

interface YearSelectorProps {
  year: number;
  onSelectYear: (year: number) => void;
}

export function YearSelector({
  year,
  onSelectYear,
}: YearSelectorProps) {
  const years = Array.from(
    { length: 12 },
    (_, index) => year - 5 + index
  );

  return (
    <div className="w-full">
      {/* Current year */}
      <div className="mb-3 text-center">
        <span className="text-sm font-semibold">
          Select Year
        </span>
      </div>

      {/* Years */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {years.map((yearOption) => {
          const isActive =
            yearOption === year;

          return (
            <button
              key={yearOption}
              type="button"
              onClick={() =>
                onSelectYear(yearOption)
              }
              className={`
                w-full
                py-3
                rounded
                border
                border-whitesmoke/15
                text-sm
                font-medium
                transition
                cursor-pointer

                ${
                  isActive
                    ? "bg-whitesmoke/87 text-black font-bold"
                    : "text-else hover:bg-lighten-1/background"
                }
              `}
            >
              {yearOption}
            </button>
          );
        })}
      </div>
    </div>
  );
}