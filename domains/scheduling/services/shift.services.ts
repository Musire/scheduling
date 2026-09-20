import { ShiftRepository } from "../repositories/ShiftRepository";
import { ShiftCreationType, ShiftDbSchema, ShiftDbType } from "../validations/ShiftSchema";


export async function getShiftsService (weekStart: string) {
    return ShiftRepository.getShifts(weekStart)
}

export async function createShiftService(data: ShiftCreationType) {
  console.log('service level received: ', data);

  // 1. Transform the validated form values into native Date objects
  const databasePayload: ShiftDbType = {
    ...data,
    shiftDate: new Date(data.shiftDate),
    startsAt: new Date(data.startsAt), // Converts "YYYY-MM-DDTHH:mm:ss.sssZ" -> Date object
    endsAt: new Date(data.endsAt),     // Converts "YYYY-MM-DDTHH:mm:ss.sssZ" -> Date object
  };

  // 2. Validate the database schema snapshot (optional but recommended for safety)
  const validatedDbData = ShiftDbSchema.parse(databasePayload);

  // 3. Pass the clean, timezone-safe Date objects down to the repository layer
  return ShiftRepository.createShift(validatedDbData);
}

export async function getSchedulingService () {
    return ShiftRepository.getSchedulingData()
}

export async function getScheduleService (week: string) {
    return ShiftRepository.getSchedule(week)
}