import { useToast } from "@/context";
import { getShifts } from "@/domains/shifts/shift.queries";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useState, useTransition } from "react";

export type UserRole = string;   // Replace with your actual UserRole enum or type if imported
export type UserStatus = string; // Replace with your actual UserStatus enum or type if imported

export interface Shift {
  id: string;
  scheduleId: string;
  userId: string;
  areaId: string;
  roleId: string;
  startsAt: number; 
  endsAt: number;   
  shiftDate: string; 
  createdAt: string ; // 🔑 Accepts both database Date objects and serialized strings
  updatedAt: string | Date; // 🔑 Accepts both database Date objects and serialized strings
  
  user: {
    id: string;
    name: string;
    email: string;
    authUserId: string | null;
    avatarUrl: string | null;
    createdAt: string | Date;       // 🔑 Accepts string | Date
    updatedAt: string | Date;       // 🔑 Accepts string | Date
    payRate: number | null | undefined; // 🔑 Accepts both null and undefined variants
    role: UserRole;                
    status: UserStatus;            
    maxHours: number;              
  } | null;

  area: {
    id: string;
    name: string;
    active: boolean;
    createdAt: string | Date; // 🔑 Accepts string | Date
    updatedAt: string | Date; // 🔑 Accepts string | Date
  } | null;

  role: {
    id: string;
    areaId: string;
    name: string;
    active: boolean;
    createdAt: string | Date; // 🔑 Accepts string | Date
    updatedAt: string | Date; // 🔑 Accepts string | Date
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