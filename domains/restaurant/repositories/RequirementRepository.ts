import { prisma } from "@/lib/prisma"
import { CreateRequirementType } from "../validation/RequirementSchema"


export const RequirementRepository = {
    async getRequirements() {
        const requirements = await prisma.coverageRequirement.findMany({
            where: {
                active: true
            }
        })
        return requirements
    },
    async createRequirement(data: CreateRequirementType) {
        const requirement = await prisma.coverageRequirement.create({
            data
        })
        return requirement
    },
    async deleteRequirements(ids: string[]) {
        const requirements = await prisma.coverageRequirement.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                active: false
            }
        })
        return requirements
    }
}