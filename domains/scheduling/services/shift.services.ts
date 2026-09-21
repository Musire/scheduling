import { ShiftRepository } from "../repositories/ShiftRepository";
import { ShiftCreationType, ShiftDbSchema, ShiftDbType } from "../validations/ShiftSchema";


export async function getShiftsService (weekStart: string) {
    return ShiftRepository.getShifts(weekStart)
}

export async function createShiftService(data: ShiftCreationType) {
  
  const databasePayload: ShiftDbType = {
    ...data,
    shiftDate: new Date(data.shiftDate),
    startsAt: new Date(data.startsAt), 
    endsAt: new Date(data.endsAt),    
  };

  const validatedDbData = ShiftDbSchema.parse(databasePayload);
  return ShiftRepository.createShift(validatedDbData);
}

export async function getSchedulingService () {
    return ShiftRepository.getSchedulingData()
}

export async function getScheduleService (week: string) {
    return ShiftRepository.getSchedule(week)
}