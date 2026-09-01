"use client";

import { parseTo24H } from "@/lib/timeUtils";
import clsx from "clsx";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TimePickerProps {
  value?: string;                    // Format: "HH:MM AM" (12-hour)
  onChange?: (value: string) => void;
  interval?: number;                 // e.g., 1, 5, 15, 30, 60
  startTime?: string;                // e.g., "08:00 AM"
  endTime?: string;                  // e.g., "06:00 PM"
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
  
  // Toggle states for individual fields
  const [showHourList, setShowHourList] = useState(false);
  const [showMinuteList, setShowMinuteList] = useState(false);

  const selectedValue = value !== undefined ? value : internalValue;

  // Helper to convert a "HH:MM" 24h string into total minutes from midnight for boundary checks
  const getMinutesFrom24H = (time24: string): number => {
    const [h, m] = time24.split(":").map(Number);
    return h * 60 + m;
  };

  // Parse current active value parts
  const parsedCurrent = useMemo(() => {
    if (!selectedValue) return { hour: 7, minute: 0, modifier: "AM" };
    const [time, mod = "AM"] = selectedValue.trim().split(" ");
    const [h, m] = time.split(":").map(Number);
    return { hour: h || 12, minute: m || 0, modifier: mod.toUpperCase() };
  }, [selectedValue]);

  const [activeHour, setActiveHour] = useState<number>(parsedCurrent.hour);
  const [activeMinute, setActiveMinute] = useState<number>(parsedCurrent.minute);
  const [activeModifier, setActiveModifier] = useState<string>(parsedCurrent.modifier);

  // Generate valid hours (1-12)
  const hoursList = useMemo(() => {
    const hrs: number[] = [];
    for (let h = 1; h <= 12; h++) {
      hrs.push(h);
    }
    return hrs;
  }, []);

  // Generate valid minutes based on interval prop
  const minutesList = useMemo(() => {
    const mins: number[] = [];
    for (let m = 0; m < 60; m += interval) {
      mins.push(m);
    }
    return mins;
  }, [interval]);

  const updateSelection = (h: number, m: number, mod: string) => {
    const formatted12H = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${mod}`;
    
    try {
      const time24 = parseTo24H(formatted12H);
      const currentMins = getMinutesFrom24H(time24);
      
      const start24 = parseTo24H(startTime);
      const end24 = parseTo24H(endTime);
      
      const startMins = getMinutesFrom24H(start24);
      const endMins = getMinutesFrom24H(end24);

      if (currentMins < startMins || currentMins > endMins) return;

      if (onChange) {
        onChange(formatted12H);
      } else {
        setInternalValue(formatted12H);
      }
    } catch (error) {
      console.error("Invalid time format processed", error);
    }
  };

  const handleHourChange = (newHour: number) => {
    setActiveHour(newHour);
    updateSelection(newHour, activeMinute, activeModifier);
    setShowHourList(false);
  };

  const handleMinuteChange = (newMinute: number) => {
    setActiveMinute(newMinute);
    updateSelection(activeHour, newMinute, activeModifier);
    setShowMinuteList(false);
  };

  const handleModifierChange = (newMod: string) => {
    setActiveModifier(newMod);
    updateSelection(activeHour, activeMinute, newMod);
  };

  const handleNow = () => {
    const now = new Date();
    const currentHour12 = format(now, "h");
    const currentMinute = Number(format(now, "mm"));
    const currentMod = format(now, "a").toUpperCase();

    const snappedMinute = Math.floor(currentMinute / interval) * interval;
    const parsedH = Number(currentHour12);

    setActiveHour(parsedH);
    setActiveMinute(snappedMinute);
    setActiveModifier(currentMod);
    updateSelection(parsedH, snappedMinute, currentMod);
    setShowHourList(false);
    setShowMinuteList(false);
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
    } else {
      setInternalValue("");
    }
    setIsOpen(false);
    setShowHourList(false);
    setShowMinuteList(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Input Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowHourList(false);
          setShowMinuteList(false);
        }}
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

      {/* Dropdown Popup Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => {
              setIsOpen(false);
              setShowHourList(false);
              setShowMinuteList(false);
            }} 
          />

          <div
            className={twMerge(
              "absolute left-0 mt-2 w-full bg-background border border-border rounded-xl shadow-lg z-20 p-4 flex flex-col gap-4 animate-ghostIn",
              dropdownStyle
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Enter time
              </span>
            </div>

            {/* Time Picker Controls Grid (2 Rows to lock top alignment) */}
            <div className="grid grid-cols-[80px_auto_80px_auto] grid-rows-[auto_auto] items-start justify-center gap-2">
              {/* Hour Toggle / Scrollable Box */}
              <div className={clsx("relative w-20", showHourList && "row-span-2")}>
                {showHourList ? (
                  <div className="flex flex-col items-center bg-surface-1 border border-border rounded-lg  max-h-45.5 overflow-y-auto scrollbar-none shadow-sm">
                    {hoursList.map((h) => {
                      const isSelected = activeHour === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => handleHourChange(h)}
                          className={clsx(
                            "w-full h-13 flex items-center justify-center text-2xl font-medium rounded transition-colors shrink-0",
                            isSelected ? "bg-primary text-primary-foreground font-semibold" : "text-else hover:bg-surface-2"
                          )}
                        >
                          {String(h).padStart(2, "0")}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowHourList(true);
                      setShowMinuteList(false);
                    }}
                    className="flex items-center justify-center bg-surface-1 border border-border rounded-lg w-20 h-13 text-2xl font-medium text-else hover:bg-surface-2 transition-all"
                  >
                    {String(activeHour).padStart(2, "0")}
                  </button>
                )}
              </div>

              {/* Colon Separator - Locked to Row 1 */}
              <span className="text-2xl font-bold text-else h-13 flex items-center justify-center">
                :
              </span>

              {/* Minute Toggle / Scrollable Box */}
              <div className={clsx("relative w-20", showMinuteList && "row-span-2")}>
                {showMinuteList ? (
                  <div className="flex flex-col items-center bg-surface-1 border border-border rounded-lg  max-h-45.5 overflow-y-auto scrollbar-none shadow-sm">
                    {minutesList.map((m) => {
                      const isSelected = activeMinute === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleMinuteChange(m)}
                          className={clsx(
                            "w-full h-13 flex items-center justify-center text-2xl font-medium rounded transition-colors shrink-0",
                            isSelected ? "bg-primary text-primary-foreground font-semibold" : "text-else hover:bg-surface-2"
                          )}
                        >
                          {String(m).padStart(2, "0")}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowMinuteList(true);
                      setShowHourList(false);
                    }}
                    className="flex items-center justify-center bg-surface-1 border border-border rounded-lg w-20 h-13 text-2xl font-medium text-else hover:bg-surface-2 transition-all"
                  >
                    {String(activeMinute).padStart(2, "0")}
                  </button>
                )}
              </div>

              {/* AM/PM Toggle Stack - Locked to Row 1 */}
              <div className="flex flex-col border border-border rounded-lg overflow-hidden h-13 w-14">
                {["AM", "PM"].map((mod) => {
                  const isSelected = activeModifier === mod;
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => handleModifierChange(mod)}
                      className={clsx(
                        "flex-1 flex items-center justify-center text-[10px] font-bold transition-colors",
                        isSelected ? "bg-primary/20 text-primary border-b border-border last:border-b-0" : "bg-background text-muted-foreground hover:bg-surface-1"
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
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-destructive font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}