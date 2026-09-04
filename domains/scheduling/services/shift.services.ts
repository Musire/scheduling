import { ShiftRepository } from "../repositories/ShiftRepository";
import { ShiftCreationType } from "../validations/ShiftSchema";


export async function getShiftsService (weekStart: string) {
    return ShiftRepository.getShifts(weekStart)
}

export async function createShiftService (data: ShiftCreationType) {
    return ShiftRepository.createShift(data)
}

export async function getSchedulingService () {
    return ShiftRepository.getSchedulingData()
}

export async function getScheduleService (week: string) {
    return ShiftRepository.getSchedule(week)
}