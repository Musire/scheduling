"use client";

import { parseTo24H } from "@/lib/timeUtils";
import clsx from "clsx";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Modal } from "../modal";

interface TimePickerProps {
  value?: string; // Format: "HH:MM AM" (12-hour)
  onChange?: (value: string) => void;
  interval?: number; // e.g., 1, 5, 15, 30, 60
  startTime?: string; // e.g., "08:00 AM"
  endTime?: string; // e.g., "06:00 PM"
  buttonStyle?: string;
  dropdownStyle?: string;
}

export default function TimePicker({
  value,
  onChange,
  interval = 1,
  startTime = "12:00 AM",
  endTime = "11:59 PM",
  buttonStyle,
  dropdownStyle,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>("");
  const [showHourList, setShowHourList] = useState(false);
  const [showMinuteList, setShowMinuteList] = useState(false);

  const selectedValue = value !== undefined ? value : internalValue;

  // Temporary picker states before "Set" is clicked
  const [tempHour, setTempHour] = useState<number>(12);
  const [tempMinute, setTempMinute] = useState<number>(0);
  const [tempModifier, setTempModifier] = useState<string>("AM");

  // Initialize temporary values when opening the modal.
  const handleOpen = () => {
    const targetTime = selectedValue || "12:00 AM";
    const [time, mod = "AM"] = targetTime.trim().split(" ");
    const [h, m] = time.split(":").map(Number);

    setTempHour(h || 12);
    setTempMinute(m || 0);
    setTempModifier(mod.toUpperCase());

    setShowHourList(false);
    setShowMinuteList(false);
    setIsOpen(true);
  };

  const getMinutesFrom24H = (time24: string): number => {
    const [h, m] = time24.split(":").map(Number);
    return h * 60 + m;
  };

  const hoursList = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    []
  );

  const minutesList = useMemo(() => {
    const mins: number[] = [];

    for (let m = 0; m < 60; m += interval) {
      mins.push(m);
    }

    return mins;
  }, [interval]);

  // Validates boundaries and applies the selected time.
  const handleSetTime = () => {
    const formatted12H = `${String(tempHour).padStart(2, "0")}:${String(
      tempMinute
    ).padStart(2, "0")} ${tempModifier}`;

    try {
      const time24 = parseTo24H(formatted12H);
      const currentMins = getMinutesFrom24H(time24);
      const startMins = getMinutesFrom24H(parseTo24H(startTime));
      const endMins = getMinutesFrom24H(parseTo24H(endTime));

      if (currentMins < startMins || currentMins > endMins) {
        // Optional: Display an out-of-bounds error message here.
        return;
      }

      if (onChange) {
        onChange(formatted12H);
      } else {
        setInternalValue(formatted12H);
      }

      closeModal();
    } catch (error) {
      console.error("Invalid time format processed", error);
    }
  };

  const handleNow = () => {
    const now = new Date();
    const snappedMinute =
      Math.floor(Number(format(now, "mm")) / interval) * interval;

    setTempHour(Number(format(now, "h")));
    setTempMinute(snappedMinute);
    setTempModifier(format(now, "a").toUpperCase());

    setShowHourList(false);
    setShowMinuteList(false);
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    } else {
      setInternalValue("");
    }

    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowHourList(false);
    setShowMinuteList(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleOpen}
        className={twMerge(
          "flex items-center justify-between w-full px-3 py-2 text-sm bg-background border border-border rounded-lg text-else hover:border-adjust focus:outline-none focus:ring-2 focus:ring-alternate",
          buttonStyle
        )}
      >
        <span className={clsx(!selectedValue && "text-muted-foreground")}>
          {selectedValue || "HH:MM"}
        </span>

        <Clock className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Modal Picker */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={twMerge("flex flex-col gap-4", dropdownStyle)}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Enter time
            </span>
          </div>

          {/* Time Picker Controls Grid */}
          <div className="grid grid-cols-[80px_auto_80px_auto] grid-rows-[auto_auto] items-start justify-center gap-2">
            {/* Hour Picker */}
            <TimeListSelection
              showList={showHourList}
              currentValue={tempHour}
              items={hoursList}
              onToggleVisibility={() => {
                setShowHourList(true);
                setShowMinuteList(false);
              }}
              onSelect={(h) => {
                setTempHour(h);
                setShowHourList(false);
              }}
            />

            {/* Colon Separator */}
            <span className="text-2xl font-bold text-else h-13 flex items-center justify-center">
              :
            </span>

            {/* Minute Picker */}
            <TimeListSelection
              showList={showMinuteList}
              currentValue={tempMinute}
              items={minutesList}
              onToggleVisibility={() => {
                setShowMinuteList(true);
                setShowHourList(false);
              }}
              onSelect={(m) => {
                setTempMinute(m);
                setShowMinuteList(false);
              }}
            />

            {/* AM/PM Toggle Stack */}
            <div className="flex flex-col border border-border rounded-lg overflow-hidden h-13 w-14">
              {["AM", "PM"].map((mod) => {
                const isSelected = tempModifier === mod;

                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setTempModifier(mod)}
                    className={clsx(
                      "flex-1 flex items-center justify-center text-[10px] font-bold transition-colors",
                      isSelected
                        ? "bg-primary/20 text-primary border-b border-border last:border-b-0"
                        : "bg-background text-muted-foreground hover:bg-surface-1"
                    )}
                  >
                    {mod}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border text-sm">
            <button
              type="button"
              onClick={handleNow}
              className="text-primary font-medium hover:underline"
            >
              Now
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-destructive font-medium"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={handleSetTime}
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* Local Sub-component helper to keep formatting cleaner */

interface TimeListSelectionProps {
  showList: boolean;
  currentValue: number;
  items: number[];
  onToggleVisibility: () => void;
  onSelect: (val: number) => void;
}

function TimeListSelection({
  showList,
  currentValue,
  items,
  onToggleVisibility,
  onSelect,
}: TimeListSelectionProps) {
  return (
    <div className={clsx("relative w-20", showList && "row-span-2")}>
      {showList ? (
        <div className="flex flex-col items-center bg-surface-1 border border-border rounded-lg max-h-45.5 overflow-y-auto scrollbar-none shadow-sm">
          {items.map((val) => {
            const isSelected = currentValue === val;

            return (
              <button
                key={val}
                type="button"
                onClick={() => onSelect(val)}
                className={clsx(
                  "w-full h-13 flex items-center justify-center text-2xl font-medium rounded transition-colors shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-else hover:bg-surface-2"
                )}
              >
                {String(val).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="flex items-center justify-center bg-surface-1 border border-border rounded-lg w-20 h-13 text-2xl font-medium text-else hover:bg-surface-2 transition-all"
        >
          {String(currentValue).padStart(2, "0")}
        </button>
      )}
    </div>
  );
}