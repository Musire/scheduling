import { ShiftRepository } from "../repositories/ShiftRepository";
import { ShiftCreationType } from "../validations/ShiftSchema";


export async function createShiftService (data: ShiftCreationType) {
    return ShiftRepository.createShift(data)
}

export async function getSchedulingService () {
    return ShiftRepository.getSchedulingData()
}