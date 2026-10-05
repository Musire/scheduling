'use client';

import { useScheduleSync } from "@/hooks/useScheduleSync";

export function ScheduleSyncListener({ schedules }: { schedules: any[] }) {
  useScheduleSync(schedules);
  return null;
}