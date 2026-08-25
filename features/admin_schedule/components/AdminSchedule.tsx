'use client';

import { CalendarController } from "@/domains/scheduling/components/CalendarController";
import { getWeekRange } from "@/domains/scheduling/utils/weekViewUtils";
import dayjs from "dayjs";
import { useState } from "react";
import { AreaFilter } from "./AreaFilter";

// Mock dataset representing data fetched from your backend database
const MOCK_SHIFTS = [
  {
    id: "shift_1",
    scheduleId: "sched_main",
    userId: "user_alex",
    areaId: "area_kitchen",
    roleId: "role_chef",
    startsAt: "2026-08-24T09:00:00Z",
    endsAt: "2026-08-24T17:00:00Z",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    user: { name: "Alex Rivera" },
    area: { id: "area_kitchen", name: "Kitchen" },
    role: { name: "Line Cook" },
  },
  {
    id: "shift_2",
    scheduleId: "sched_main",
    userId: "user_jordan",
    areaId: "area_dining",
    roleId: "role_server",
    startsAt: "2026-08-24T11:30:00Z",
    endsAt: "2026-08-24T19:30:00Z",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    user: { name: "Jordan Lee" },
    area: { id: "area_dining", name: "Dining" },
    role: { name: "Lead Server" },
  },
  {
    id: "shift_3",
    scheduleId: "sched_main",
    userId: "user_taylor",
    areaId: "area_kitchen",
    roleId: "role_chef",
    startsAt: "2026-08-25T14:00:00Z",
    endsAt: "2026-08-25T22:00:00Z",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    user: { name: "Taylor Swift" },
    area: { id: "area_kitchen", name: "Kitchen" },
    role: { name: "Sous Chef" },
  },
  {
    id: "shift_4",
    scheduleId: "sched_main",
    userId: "user_morgan",
    areaId: "area_dining",
    roleId: "role_host",
    startsAt: "2026-08-28T10:00:00Z",
    endsAt: "2026-08-28T18:00:00Z",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",
    user: { name: "Morgan Freeman" },
    area: { id: "area_dining", name: "Dining" },
    role: { name: "Host" },
  },
];

export default function AdminSchedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekRange().startOfWeek);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedAreaId, setSelectedAreaId] = useState("all");

  const filteredShifts = MOCK_SHIFTS.filter((shift) => {
    const shiftDate = dayjs(shift.startsAt).format("YYYY-MM-DD");
    const matchesDate = shiftDate === selectedDate;
    const matchesArea = selectedAreaId === "all" || shift.areaId === selectedAreaId;
    return matchesDate && matchesArea;
  });

  return (
    <section className="py-6 flex flex-1 flex-col space-y-6 items-center bg-neutral-950 text-white w-full">
      <CalendarController 
        currentWeekStart={currentWeekStart}
        setCurrentWeekStart={setCurrentWeekStart}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Render the standalone component */}
      <AreaFilter 
        selectedAreaId={selectedAreaId} 
        setSelectedAreaId={setSelectedAreaId} 
      />

      {/* The Dynamic Content Container */}
      <div className="flex flex-col flex-1 w-full rounded-lg max-w-md">
        {filteredShifts.length === 0 ? (
          <p className="text-neutral-400 text-sm flex-1 text-center py-4">No scheduled shifts for this day and area.</p>
        ) : (
          <ul className="space-y-2">
            {filteredShifts.map((shift) => {
              const formattedTime = `${dayjs(shift.startsAt).format("hh:mm A")} - ${dayjs(shift.endsAt).format("hh:mm A")}`;
              
              return (
                <li key={shift.id} className="hover:bg-neutral-900 cursor-pointer p-3 rounded border border-neutral-800 flex justify-between items-center shrink-0 h-16">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{shift.user.name}</span>
                    <div className="flex items-center space-x-2 text-xs text-neutral-400">
                      <span className="text-neutral-300">{shift.role.name}</span>
                      <span>•</span>
                      <span>{shift.area.name}</span>
                    </div>
                  </div>
                  <span className="text-neutral-400 text-xs">{formattedTime}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
