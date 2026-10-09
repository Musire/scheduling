import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";
import { CreateRequirementType, UpdateRequirementType } from "./RequirementSchema";
import { calculateCoverage } from "./coverage-util";


export const RequirementRepository = {
    async getRequirements(startOfWeek: string) {
        const weekStart = new Date(startOfWeek);

        const requirements = await prisma.coverageRequirement.findMany({
            where: { active: true },
            include: {
                area: { select: { name: true } },
                role: { select: { name: true } }
            }
        });

        const requirementsWithCoverage = await Promise.all(
            requirements.map(async (req) => {
                try {
                    const targetDate = addDays(
                        weekStart,
                        req.dayOfWeek - 1
                    );

                    const shiftDateToMatch = new Date(
                        Date.UTC(
                            targetDate.getUTCFullYear(),
                            targetDate.getUTCMonth(),
                            targetDate.getUTCDate()
                        )
                    );

                    const candidates = await prisma.shift.findMany({
                        where: {
                            areaId: req.areaId,
                            roleId: req.roleId,
                            shiftDate: shiftDateToMatch,
                            startsAt: { lte: req.startsAt },
                            endsAt: { gte: req.endsAt }
                        },
                        select: {
                            startsAt: true,
                            endsAt: true
                        }
                    });

                    console.log({
                        candidates,
                        req
                    })

                    const coverage = calculateCoverage(
                        req.startsAt,
                        req.endsAt,
                        candidates,
                        req.requiredUsers
                    );

                    
                    
                    return {
                        ...req,
                        _count: coverage.average
                    };
                } catch (err) {
                    console.error(
                        `Error processing requirement ID ${req.id}:`,
                        err
                    );
                    throw err;
                }
            })
        );

        return requirementsWithCoverage;
    },
    async getRequirementDetails(startOfWeek: string, id: string) {
        const req = await prisma.coverageRequirement.findUnique({
            where: {
                id
            },
            include: {
                area: { select: { name: true } },
                role: { select: { name: true } }
            }
        })
        
        return req

        
    },
    async createRequirement(data: CreateRequirementType) {
        const requirement = await prisma.coverageRequirement.create({
            data
        })
        return requirement
    },
    async updateRequirement(data: UpdateRequirementType) {
        const requirement = await prisma.coverageRequirement.update({
            where: {
                id: data.id
            },
            data
        })
        return requirement
    },
    async deleteRequirements(id: string) {
        const requirements = await prisma.coverageRequirement.update({
            where: { id },
            data: {
                active: false
            }
        })
        return requirements
    }
}