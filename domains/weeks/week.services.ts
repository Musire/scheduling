import { WeekRepository } from "./week.repositories";
import { WeekCreationType, WeekPublishType } from "./week.validations";


export async function createWeekService (formData: WeekCreationType) {
    return WeekRepository.createSchedule(formData)
}

export async function publishWeekService (input: WeekPublishType) {
    return WeekRepository.publishWeek(input)
}

export async function unpublishWeekService (input: WeekPublishType) {
    return WeekRepository.unpublishWeek(input)
}