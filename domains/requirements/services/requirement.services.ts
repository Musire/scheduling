import { RequirementRepository } from "../repositories/RequirementRepository";
import { CreateRequirementType, UpdateRequirementType } from "../validation/RequirementSchema";


export async function getRequirementsService (startOfWeek: string) {
    return RequirementRepository.getRequirements(startOfWeek)
}

export async function getRequirementDetailsService ({ dayOfWeek, id }: {dayOfWeek: string, id: string}) {
    return RequirementRepository.getRequirementDetails(dayOfWeek, id)
}

export async function createRequirementService(data: CreateRequirementType) {
    return RequirementRepository.createRequirement(data)
}

export async function updateRequirementService(data: UpdateRequirementType) {
    return RequirementRepository.updateRequirement(data)
}

export async function deleteRequirementService(ids: string[]) {
    return RequirementRepository.deleteRequirements(ids)
}