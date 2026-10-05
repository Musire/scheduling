'use client';

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function useScheduleSync(schedules: { id: string; weekStart: Date | string }[] = []) {
  const { setValue, control } = useFormContext();
  const shiftDate = useWatch({ control, name: "shiftDate" });

  useEffect(() => {
    if (!shiftDate) {
      setValue("scheduleId", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const targetDate = new Date(shiftDate);

    const matched = schedules.find((s) => {
      const weekStart = new Date(s.weekStart);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      return targetDate >= weekStart && targetDate < weekEnd;
    });

    // Automatically update scheduleId in formState
    setValue("scheduleId", matched?.id ?? "", { 
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [shiftDate, schedules, setValue]);
}