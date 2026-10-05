"use client";


import { useCalendar } from "@/context/CalanderProvider";
import ShiftCard from "@/domains/shifts/components/ShiftCard";
import { ScheduleStatus } from "@/generated/prisma/enums";
import { CalendarController } from "../../../features/admin_schedule/components/date-picker/CalendarController";
import NoSchedule from "../../../features/admin_schedule/components/NoSchedule";
import StatusButton from "../../../features/admin_schedule/components/StatusButton";

export type Schedule = {
    id: string;
    weekStart: Date;
    status: ScheduleStatus;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Area {
  id: string;
  name: string;
}

type Props = {
  schedule: Schedule | null | undefined;
  areas: Area[]
}


export default function AdminSchedule({ schedule, areas }:  Props) {
  const { filteredShifts } = useCalendar(schedule?.id);


  return (
    <section className="py-6 flex flex-1 flex-col space-y-6 items-center overflow-hidden text-main ">
      <StatusButton status={schedule?.status ?? null} weekId={schedule?.id ?? ''} />
      <CalendarController areas={areas} />
      {!schedule && <NoSchedule />}
      {schedule && (
        <div className="flex flex-col flex-1 w-full rounded-lg max-w-md">
          {filteredShifts.length === 0 ? (
            <p className="text-neutral-400 text-sm flex-1 text-center py-4">
              No scheduled shifts for this
              day and area.
            </p>
          ) : (
            <ul className="space-y-2 flex-1 max-h-[55dvh] overflow-y-auto scrollbar-adjust">
              {filteredShifts.map((shift) => <ShiftCard key={shift.id} shift={shift} />)}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}