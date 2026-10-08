import { toUtcMidnight } from "@/lib/timeUtils";
import { getCurrentUser } from "../identity/actions/auth.actions";
import { ShiftRepository } from "./shift.repositories";
import { ShiftCreationType, ShiftDbSchema, ShiftDbType } from "./shift.validations.ts";


export async function getShiftsService (weekStart: string) {
    const user = await getCurrentUser()

    if (user?.user_metadata.role === 'END_USER') {
      return ShiftRepository.getEmployeeShifts(weekStart, user.id)
    }
    return ShiftRepository.getShifts(weekStart)
}

export async function createShiftService(data: ShiftCreationType) {
  
  const databasePayload: ShiftDbType = {
    ...data,
    shiftDate: toUtcMidnight(data.shiftDate),
    startsAt: new Date(data.startsAt), 
    endsAt: new Date(data.endsAt),    
  };

  console.log(databasePayload)

  const validatedDbData = ShiftDbSchema.parse(databasePayload);
  return ShiftRepository.createShift(validatedDbData);
}

export async function getSchedulingService () {
    return ShiftRepository.getSchedulingData()
}

export async function getScheduleService (week: string) {
    return ShiftRepository.getSchedule(week)
}