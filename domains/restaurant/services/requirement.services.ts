import { RequirementRepository } from "../repositories/RequirementRepository";
import { DeleteRequirmentType } from "../validation/DeleteSchema";
import { CreateRequirementType } from "../validation/RequirementSchema";


export async function getRequirementsService () {
    return RequirementRepository.getRequirements()
}

export async function createRequirementService(data: CreateRequirementType) {
    return RequirementRepository.createRequirement(data)
}

export async function deleteRequirementService(data: DeleteRequirmentType) {
    return RequirementRepository.deleteRequirements(ids)
}