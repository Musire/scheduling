import { prisma } from "@/lib/prisma";
import { addDays, setHours, setMinutes, startOfDay } from "date-fns";
import { CreateRequirementType, UpdateRequirementType } from "../validation/RequirementSchema";


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

        const requirementsWithCounts = await Promise.all(
            requirements.map(async (req) => {
                try {
                    const targetDate = addDays(weekStart, req.dayOfWeek);
                    const shiftDateToMatch = startOfDay(targetDate);

                    // Ensure they are proper Date objects before calling UTC methods
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
                    };
                } catch (err) {
                    console.error(`Error processing requirement ID ${req.id}:`, err);
                    throw err;
                }
            })
        );

        return requirementsWithCounts;
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