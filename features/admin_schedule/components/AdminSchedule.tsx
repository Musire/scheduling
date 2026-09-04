"use client";


import { useCalendar } from "@/context/CalanderProvider";
import { ScheduleStatus } from "@/generated/prisma/enums";
import { format, parseISO } from "date-fns";
import { CalendarController } from "./date-picker/CalendarController";
import NoSchedule from "./NoSchedule";
import ScheduleCard from "./ScheduleCard";
import StatusButton from "./StatusButton";


type Props = {
  schedule: {
    id: string;
    weekStart: Date;
    status: ScheduleStatus;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  } | null | undefined;
}


const AREAS = [
  {
    id: "area_kitchen",
    name: "Kitchen",
  },
  {
    id: "area_dining",
    name: "Dining",
  },
];

export default function AdminSchedule({ schedule }:  Props) {
  const { filteredShifts } = useCalendar(schedule?.id);

  return (
    <section className="py-6 flex flex-1 flex-col space-y-6 items-center bg-neutral-950 text-white ">
      <StatusButton status={schedule?.status ?? null} />
      <CalendarController areas={AREAS} />
      {!schedule && <NoSchedule />}
      {schedule && (
        <div className="flex flex-col flex-1 w-full rounded-lg max-w-md">
          {filteredShifts.length === 0 ? (
            <p className="text-neutral-400 text-sm flex-1 text-center py-4">
              No scheduled shifts for this
              day and area.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredShifts.map((shift) => {
                const startTime = format(
                  parseISO(shift.startsAt),
                  "hh:mm a"
                );

                const endTime = format(
                  parseISO(shift.endsAt),
                  "hh:mm a"
                );

                const formattedTime =
                  `${startTime} - ${endTime}`;

                return (
                  <ScheduleCard key={shift.id} shift={shift} formattedTime={formattedTime} />
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}