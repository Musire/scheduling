"use client";

interface CalendarDayButtonProps {
  dateString: string;
  dayName?: string;
  isToday?: boolean;
  isSelected: boolean;
  isOutsideMonth?: boolean;
  showDayName?: boolean;
  onSelect: (dateString: string) => void;
}

export function CalendarDayButton({
  dateString,
  dayName,
  isToday = false,
  isSelected,
  isOutsideMonth = false,
  showDayName = true,
  onSelect,
}: CalendarDayButtonProps) {
  const dayNumber =
    dateString.split("-")[2];

  return (
    <button
      type="button"
      onClick={() => onSelect(dateString)}
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
          isToday
            ? "ring-1 ring-whitesmoke/60"
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
          {dayName}
        </span>
      )}

      <span className="text-base font-semibold">
        {dayNumber}
      </span>
    </button>
  );
}