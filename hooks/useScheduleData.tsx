import { useToast } from "@/context";
import { getShifts } from "@/domains/scheduling/queries/getShifts";
import { format, parseISO } from "date-fns";
import { useEffect, useState, useTransition } from "react";

export interface Shift {
  id: string;
  scheduleId: string;
  userId: string;
  areaId: string;
  roleId: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  user: { name: string };
  area: { id: string; name: string };
  role: { name: string };
}

export function useScheduleData(
  currentWeekStart: Date,
  selectedDate: string,
  selectedAreaId: string,
  scheduleId: string | undefined | null 
) {
  const { createError } = useToast();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isPending, startTransition] = useTransition();

  const formattedWeek = format(currentWeekStart, "yyyy-MM-dd");

  useEffect(() => {
    if (!scheduleId) {
      setShifts([]);
      return;
    }

    let isMounted = true;

    startTransition(async () => {
      const res = await getShifts(formattedWeek);

      if (!isMounted) return;

      if (!res.success && res.error) {
        createError(res.error);
        setShifts([]);
        return;
      }

      if (res.data) {
        setShifts(res.data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [formattedWeek, scheduleId, createError]); 
  
  const filteredShifts = shifts.filter((shift) => {
    const shiftDate = format(parseISO(shift.startsAt), "yyyy-MM-dd");
    const matchesDate = shiftDate === selectedDate;
    const matchesArea = selectedAreaId === "all" || shift.areaId === selectedAreaId;
    return matchesDate && matchesArea;
  });

  return { filteredShifts, isPending };
}