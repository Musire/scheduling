import { ScheduleRepository } from "../repositories/ScheduleRepository";
import { ScheduleCreationType } from "../validations/ScheduleSchema";


export async function createScheduleService (formData: ScheduleCreationType) {
    return ScheduleRepository.createSchedule(formData)
}