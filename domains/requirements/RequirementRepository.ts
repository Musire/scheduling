import { prisma } from "@/lib/prisma";
import { addDays, setHours, setMinutes, startOfDay } from "date-fns";
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

                    const startsAtDate = new Date(req.startsAt);
                    const endsAtDate = new Date(req.endsAt);

                    const reqStartDateTime = new Date(
                        Date.UTC(
                            targetDate.getUTCFullYear(),
                            targetDate.getUTCMonth(),
                            targetDate.getUTCDate(),
                            startsAtDate.getUTCHours(),
                            startsAtDate.getUTCMinutes()
                        )
                    );

                    const reqEndDateTime = new Date(
                        Date.UTC(
                            targetDate.getUTCFullYear(),
                            targetDate.getUTCMonth(),
                            targetDate.getUTCDate(),
                            endsAtDate.getUTCHours(),
                            endsAtDate.getUTCMinutes()
                        )
                    );

                    const candidates = await prisma.shift.findMany({
                        where: {
                            areaId: req.areaId,
                            roleId: req.roleId,
                            shiftDate: shiftDateToMatch,
                            startsAt: { lt: reqEndDateTime },
                            endsAt: { gt: reqStartDateTime }
                        },
                        select: {
                            startsAt: true,
                            endsAt: true
                        }
                    });

                    const coverage = calculateCoverage(
                        reqStartDateTime,
                        reqEndDateTime,
                        candidates,
                        req.requiredUsers
                    );
                    
                    return {
                        ...req,
                        _count: coverage.average.toFixed(1)
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
        const weekStart = new Date(startOfWeek);

        const req = await prisma.coverageRequirement.findUnique({
            where: {
                id
            },
            include: {
                area: { select: { name: true } },
                role: { select: { name: true } }
            }
        })
        
        if (!req) return;

        const targetDate = addDays(weekStart, req.dayOfWeek);
        const shiftDateToMatch = startOfDay(targetDate);

        const startsAtDate = new Date(req.startsAt);
        const endsAtDate = new Date(req.endsAt);

        const reqStartDateTime = setMinutes(
            setHours(new Date(targetDate), startsAtDate.getUTCHours()),
            startsAtDate.getUTCMinutes()
        );

        const reqEndDateTime = setMinutes(
            setHours(new Date(targetDate), endsAtDate.getUTCHours()),
            endsAtDate.getUTCMinutes()
        );

        const shiftCount = await prisma.shift.count({
            where: {
                areaId: req.areaId,
                roleId: req.roleId,
                shiftDate: shiftDateToMatch,
                startsAt: { lt: reqEndDateTime },
                endsAt: { gt: reqStartDateTime }
            }
        });

        return {
            ...req,
            _count: shiftCount
        }

        
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