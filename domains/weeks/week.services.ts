import { WeekRepository } from "./week.repositories";
import { WeekCreationType } from "./week.validations";


export async function createWeekService (formData: WeekCreationType) {
    return WeekRepository.createSchedule(formData)
}