import { useToast } from "@/context";
import { getShifts } from "@/domains/shifts/shift.queries";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState, useTransition } from "react";

export interface Shift {
  id: string;
  scheduleId: string;
  userId: string;
  areaId: string;
  roleId: string;
  startsAt: number; // Keep as integer seconds since midnight
  endsAt: number;   // Keep as integer seconds since midnight
  shiftDate: string; // Serialized ISO string
  createdAt: string; // Serialized ISO string
  updatedAt: string; // Serialized ISO string
  
  // Update relations to allow 'null' and include the extra database fields
  user: {
    id: string;
    name: string;
    email: string;
    authUserId: string | null;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    payRate: number | null;
  } | null;

  area: {
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;

  role: {
    id: string;
    areaId: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
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
    // Early return if no schedule exists — do not invoke setShifts synchronously here
    if (!scheduleId) {
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

  // Derive active shifts: if scheduleId is falsy, evaluate to an empty list immediately during render
  const activeShifts = scheduleId ? shifts : [];

  const filteredShifts = activeShifts.filter((shift) => {
    const shiftDate = formatInTimeZone(parseISO(shift.shiftDate), 'UTC', 'yyyy-MM-dd')
    const matchesDate = shiftDate === selectedDate;
    const matchesArea =
      selectedAreaId === "all" || shift.areaId === selectedAreaId;
    return matchesDate && matchesArea;
  });

  return { filteredShifts, isPending };
}