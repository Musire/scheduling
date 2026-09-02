import { prisma } from "@/lib/prisma"
import { CreateRequirementType } from "../validation/RequirementSchema"
import { addDays, setHours, setMinutes, startOfDay } from "date-fns";


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

        console.log('found requirments', requirements)
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
                        _count: {
                            shifts: shiftCount
                        },
                    };
                } catch (err) {
                    console.error(`Error processing requirement ID ${req.id}:`, err);
                    throw err;
                }
            })
        );

        console.log('count: ', requirementsWithCounts)
        return requirementsWithCounts;
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