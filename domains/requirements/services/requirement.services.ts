import { RequirementRepository } from "../repositories/RequirementRepository";
import { CreateRequirementType } from "../validation/RequirementSchema";


export async function getRequirementsService (startOfWeek: string) {
    console.log(startOfWeek)
    const requirements = await RequirementRepository.getRequirements(startOfWeek)
    console.log('prisma: ',requirements)
    return requirements
}

export async function createRequirementService(data: CreateRequirementType) {
    return RequirementRepository.createRequirement(data)
}

export async function deleteRequirementService(ids: string[]) {
    return RequirementRepository.deleteRequirements(ids)
}